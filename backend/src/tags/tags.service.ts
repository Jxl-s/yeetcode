import { Injectable } from '@nestjs/common';
import tags from '../data/tags';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
    constructor(private readonly prisma: PrismaService) {
        this.default();
    }

    async default() {
        const count = await this.prisma.tags.count();
        if (count > 0) {
            return;
        }

        await this.prisma.tags.createMany({
            data: tags,
        });
    }
}
