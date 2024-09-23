import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRunDto } from './dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { LanguagesService } from 'src/languages/languages.service';
import { MetadataAlgo } from 'src/languages/common/snippets';

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

    public async createRun(dto: CreateRunDto, userId: number) {
        // Fetch the problem
        const problem = await this.prisma.problem.findUnique({
            where: {
                id: dto.question_id,
            },
        });

        if (!problem) {
            throw new NotFoundException('Problem not found');
        }

        if (problem.type === 'ALGO') {
            const parsed = JSON.parse(problem.metadata);
            const metadata = MetadataAlgo.fromObject(parsed);

            const [code, separator] = this.languageService.makeAlgoRunner(
                dto.code,
                dto.language,
                metadata,
            );

            // Parse the test cases
            for (const test of dto.tests) {
                for (const key of Object.keys(test)) {
                    test[key] = JSON.parse(test[key]);
                }
            }

            const languageId = this.languageService.getLanguageId(dto.language);
            const testCases = dto.tests
                .map((test) => JSON.stringify(test))
                .join('\n');

            const res = await axios.post(
                `${this.config.get('JUDGE0_URL')}/submissions?wait=true`,
                {
                    language_id: languageId,
                    source_code: code,
                    stdin: testCases,
                },
            );

            console.log(res.data);
            if (res.data.stdout) {
                const { results, stdout } =
                    this.languageService.extractAlgoOutput(
                        res.data.stdout,
                        separator,
                    );

                return {
                    results,
                    stdout,
                };
            }
        }

        return { hello: 'world' };
    }
}
