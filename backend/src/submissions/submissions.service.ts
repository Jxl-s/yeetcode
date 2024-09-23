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

        // Run user submitted code
        const [code, separator] = this.languageService.makeAlgoRunner(
            source,
            language,
            metadata,
        );

        const res = await axios.post(
            `${this.config.get('JUDGE0_URL')}/submissions?wait=true`,
            {
                language_id: languageId,
                source_code: code,
                stdin: testCases,
            },
        );

        if (res.data.stderr) {
            return { stderr: res.data.stderr };
        }

        if (res.data.stdout) {
            return this.languageService.extractAlgoOutput(
                res.data.stdout,
                separator,
            );
        }

        return { stderr: 'No output' };
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
                `
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummyHead = ListNode(0)
        tail = dummyHead
        carry = 0

        while l1 is not None or l2 is not None or carry != 0:
            digit1 = l1.val if l1 is not None else 0
            digit2 = l2.val if l2 is not None else 0

            sum = digit1 + digit2 + carry
            digit = sum % 10
            carry = sum // 10

            newNode = ListNode(digit)
            tail.next = newNode
            tail = tail.next

            l1 = l1.next if l1 is not None else None
            l2 = l2.next if l2 is not None else None

        result = dummyHead.next
        dummyHead.next = None
        return result
`,
                'python3',
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
}
