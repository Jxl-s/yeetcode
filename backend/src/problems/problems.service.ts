import { Injectable } from '@nestjs/common';
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

    public async getProblems(dto: GetProblemsDto) {
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
                tags: true,
                difficulty: true,
                title: true,
            },
        });

        return { data: problems };
    }
}
