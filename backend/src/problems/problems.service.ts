import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProblemsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProblemsService {
    constructor(private readonly prisma: PrismaService) {
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
            },
        });

        if (!problem) {
            throw new NotFoundException('Problem not found');
        }

        return { data: problem };
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
            const totalSubmissions = problem._count.submissions;
            const acceptedSubmissions = acceptedCountMap[problem.id] || 0;
            const acceptanceRate =
                totalSubmissions > 0
                    ? (acceptedSubmissions / totalSubmissions) * 100
                    : 0;

            delete problem._count;
            return {
                ...problem,
                acceptance: acceptanceRate,
            };
        });

        // Return the modified problems with the acceptance rates
        return { data: problemsWithAcceptance, count: problemCount };
    }
}
