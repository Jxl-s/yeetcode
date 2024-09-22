import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProblemsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { LanguagesService } from 'src/languages/languages.service';

@Injectable()
export class ProblemsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly languageService: LanguagesService,
    ) {
        this.default();
    }

    async default() {
        const count = await this.prisma.problem.count();
        if (count > 0) return;

        // TODO: Add test cases
        try {
            const problemsPath = path.join(__dirname, '../../problems');
            const files = fs.readdirSync(problemsPath);

            for (const folder of files) {
                const dataPath = path.join(problemsPath, folder, 'data.json');
                const dataJson = require(dataPath);

                const descPath = path.join(
                    problemsPath,
                    folder,
                    'description.md',
                );

                const description = fs.readFileSync(descPath, 'utf-8');

                // Can only do one at a time, so that tags work
                await this.prisma.problem.create({
                    data: {
                        id: dataJson.id,
                        title: dataJson.title,
                        description,
                        difficulty: dataJson.difficulty,

                        type: dataJson.type,
                        metadata: JSON.stringify(dataJson.metadata),

                        tags: {
                            connectOrCreate: dataJson.tags.map(
                                (tag: string) => ({
                                    where: { id: tag },
                                    create: { id: tag },
                                }),
                            ),
                        },
                    },
                });

                const testsPath = path.join(problemsPath, folder, 'tests.json');
                if (fs.existsSync(testsPath)) {
                    const testsJson = require(testsPath);
                    const testToCreate = [];

                    for (let i = 0; i < testsJson.length; i++) {
                        const test = testsJson[i];
                        testToCreate.push({
                            problem_id: dataJson.id,
                            id: i + 1,
                            input: JSON.stringify(test.args),
                            output: JSON.stringify(test.expected),
                        });
                    }

                    await this.prisma.testCase.createMany({
                        data: testToCreate,
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async getProblem(id: string) {
        const problem = await this.prisma.problem.findUnique({
            where: { id },
            select: {
                number: true,
                id: true,
                title: true,
                description: true,
                difficulty: true,
                tags: true,
                metadata: true,
                type: true,
                _count: {
                    select: {
                        submissions: true,
                    },
                },
                test_cases: {
                    select: {
                        input: true,
                    },
                    orderBy: {
                        id: 'asc',
                    },
                    take: 3,
                },
            },
        });

        if (!problem) {
            throw new NotFoundException('Problem not found');
        }

        const snippets = this.languageService.makeSnippets(
            problem.type,
            problem.metadata,
        );

        const testCases = problem.test_cases;

        delete problem.type;
        delete problem.metadata;
        delete problem.test_cases;

        const acceptedCounts = await this.prisma.submission.count({
            where: {
                status: 'ACCEPTED',
                problem_id: id,
            },
        });

        let newProblem = {
            ...problem,
            tags: problem.tags.map((tag) => tag.id),
            submissions: problem._count.submissions,
            accepted: acceptedCounts,
        };

        delete newProblem._count;

        return {
            data: newProblem,
            snippets,
            test_cases: testCases.map((testCase) => JSON.parse(testCase.input)),
        };
    }

    public async getProblems(dto: GetProblemsDto) {
        const problemCount = await this.prisma.problem.count({
            where: {
                title: {
                    contains: dto.q,
                },
            },
        });

        const problems = await this.prisma.problem.findMany({
            where: {
                title: {
                    contains: dto.q,
                },
            },
            skip: (dto.page - 1) * dto.limit,
            take: dto.limit,
            select: {
                id: true,
                difficulty: true,
                title: true,
                number: true,
                _count: {
                    select: {
                        submissions: true,
                    },
                },
            },
            orderBy: {
                number: 'asc',
            },
        });

        // Also count the number of accepted submissions
        const acceptedCounts = await this.prisma.submission.groupBy({
            by: ['problem_id'],
            where: {
                status: 'ACCEPTED',
                problem_id: {
                    in: problems.map((problem) => problem.id),
                },
            },
            _count: {
                _all: true,
            },
        });

        // Map the accepted counts to a dictionary
        const acceptedCountMap = acceptedCounts.reduce((acc, curr) => {
            acc[curr.problem_id] = curr._count._all;
            return acc;
        }, {});

        // Add the acceptance rate to the problems
        const problemsWithAcceptance = problems.map((problem) => {
            const submitCount = problem._count.submissions;
            const acceptCount = acceptedCountMap[problem.id];

            delete problem._count;
            return {
                ...problem,
                submissions: submitCount,
                accepted: acceptCount ?? 0,
            };
        });

        // Return the modified problems with the acceptance rates
        return { data: problemsWithAcceptance, count: problemCount };
    }

    public async getSubmissions(problemId: string, userId: number) {
        const submissions = await this.prisma.submission.findMany({
            where: {
                user_id: userId,
                problem_id: problemId,
            },
            select: {
                id: true,
                status: true,
                created_at: true,
                language: {
                    select: {
                        name: true,
                    },
                },
                runtime: true,
                memory: true,
            },
        });

        const submissionsLang = submissions.map((submission) => ({
            ...submission,
            language: submission.language.name,
        }));

        return { data: submissionsLang };
    }
}
