import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubmissionsService {
    constructor(private readonly prisma: PrismaService) {}

    public async getSubmission(id: number, userId: number) {
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
}
