import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRunDto } from './dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import {
    getLanguageArr,
    LanguagesService,
} from 'src/languages/languages.service';
import { MetadataAlgo } from 'src/languages/common/snippets';
import { v4 } from 'uuid';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as archiver from 'archiver';

function copyFolderSync(src: string, dest: string) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function zipFolder(sourceFolder: string, outPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Sets the compression level.
        });

        output.on('close', () => {
            resolve();
        });

        output.on('end', () => {
            console.log('Data has been drained');
        });

        archive.on('warning', (err) => {
            if (err.code !== 'ENOENT') {
                reject(err);
            } else {
                console.warn(err);
            }
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);

        archive.directory(sourceFolder, false);

        archive.finalize();
    });
}

@Injectable()
export class SubmissionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly languageService: LanguagesService,
    ) {}

    public async getSubmission(id: string, userId: number) {
        const submission = await this.prisma.submission.findUnique({
            where: {
                id,
                user_id: userId,
            },
            select: {
                status: true,
                created_at: true,

                runtime: true,
                memory: true,

                passed: true,
                error: true,

                language: {
                    select: {
                        name: true,
                    },
                },
                code: true,
            },
        });

        if (!submission) {
            throw new NotFoundException('Submission not found');
        }

        const withLang = {
            ...submission,
            language: submission.language.name,
        };

        return {
            data: withLang,
        };
    }

    private async runAlgo(
        source: string,
        language: ReturnType<typeof getLanguageArr>[number],
        metadata: MetadataAlgo,
        tests: Object[],
    ): Promise<{
        stdout?: string[];
        stderr?: string;
        results?: string[];
        correct_results?: Object[];
    }> {
        const languageId = this.languageService.getLanguageId(language);
        const testCases = tests.map((test) => JSON.stringify(test)).join('\n');

        const toBase64 = (str: string) => Buffer.from(str).toString('base64');
        const fromBase64 = (str: string) =>
            Buffer.from(str, 'base64').toString();

        // Run user submitted code
        const [code, separator] = this.languageService.makeAlgoRunner(
            source,
            language,
            metadata,
        );

        // Make the runner folder
        const runUuid = v4();
        const tempDir = os.tmpdir();
        const runFolder = path.join(tempDir, runUuid);
        fs.mkdirSync(runFolder);

        const judgeFilesFolder = `./judge_files/${language}`;
        copyFolderSync(judgeFilesFolder, runFolder);

        // Add the driver file
        fs.writeFileSync(
            path.join(
                runFolder,
                this.languageService.getLanguageEntry(language),
            ),
            code,
        );

        // Zip the folder
        const zipPath = path.join(tempDir, `${runUuid}.zip`);
        await zipFolder(runFolder, zipPath);

        const zipBuffer = fs.readFileSync(zipPath);
        const zipBase64 = zipBuffer.toString('base64');

        fs.unlinkSync(zipPath);
        fs.rmSync(runFolder, { recursive: true });

        // Copy the judge files over
        try {
            const res = await axios.post(
                `${this.config.get('JUDGE0_URL')}/submissions?wait=true&base64_encoded=true`,
                {
                    language_id: 89, // for any language, just multi-file
                    stdin: toBase64(testCases),
                    additional_files: zipBase64,
                },
            );

            if (res.data.stderr) {
                return { stderr: fromBase64(res.data.stderr) };
            }

            if (res.data.compile_output) {
                return { stderr: fromBase64(res.data.compile_output) };
            }

            if (res.data.stdout) {
                return this.languageService.extractAlgoOutput(
                    fromBase64(res.data.stdout),
                    separator,
                );
            }

            return { stderr: 'No output' };
        } catch (err) {
            console.log(err);
            return { stderr: 'Internal error' };
        }
    }

    public async createRun(dto: CreateRunDto) {
        // Fetch the problem
        const problem = await this.prisma.problem.findUnique({
            where: {
                id: dto.question_id,
            },

            select: {
                type: true,
                metadata: true,
                sol: true,
                sol_lang: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!problem) {
            throw new NotFoundException('Problem not found');
        }

        if (problem.type === 'ALGO') {
            const parsed = JSON.parse(problem.metadata);
            const metadata = MetadataAlgo.fromObject(parsed);

            // Parse the test cases
            for (const test of dto.tests) {
                for (const key of Object.keys(test)) {
                    test[key] = JSON.parse(test[key]);
                }
            }

            const userCode = this.runAlgo(
                dto.code,
                dto.language,
                metadata,
                dto.tests,
            );

            const correctCode = this.runAlgo(
                problem.sol,
                problem.sol_lang.name as never,
                metadata,
                dto.tests,
            );

            const [userOut, correctOut] = await Promise.all([
                userCode,
                correctCode,
            ]);

            if (userOut.stderr) {
                return {
                    stderr: userOut.stderr,
                };
            }

            const valid = [];
            if (userOut.results && userOut.stdout && correctOut.results) {
                // Compare results
                for (let i = 0; i < userOut.results.length; i++) {
                    valid.push(userOut.results[i] === correctOut.results[i]);
                }
            }

            return {
                correct: valid,
                stdout: userOut.stdout,
                results: userOut.results,
                expected: correctOut.results,
            };
        }

        throw new BadRequestException('Invalid problem type');
    }

    public async createSubmit(dto: CreateRunDto) {}
}
