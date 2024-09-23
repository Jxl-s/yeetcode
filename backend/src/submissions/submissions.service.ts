import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRunDto } from './dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubmissionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
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
        console.log(dto, userId, this.config.get('JUDGE0_URL'));
        return { hello: 'world' };
    }
}
