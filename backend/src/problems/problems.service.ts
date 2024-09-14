import { Injectable } from '@nestjs/common';
import { GetProblemsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemsService {
    constructor(private readonly prismaService: PrismaService) {}

    public async getProblems(dto: GetProblemsDto) {
        const problems = await this.prismaService.problem.findMany({
            where: {
                title: {
                    contains: dto.q,
                },
            },
            skip: (dto.page - 1) * dto.limit,
            take: dto.limit,
        });

        return { data: problems };
    }
}
