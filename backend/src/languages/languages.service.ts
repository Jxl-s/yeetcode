import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LanguagesService {
    private languages = [
        {
            id: 50,
            name: 'C',
        },
        {
            id: 54,
            name: 'C++',
        },
        {
            id: 71,
            name: 'Python3',
        },
        {
            id: 62,
            name: 'Java',
        },
        {
            id: 63,
            name: 'JavaScript',
        },
    ];

    constructor(private readonly prisma: PrismaService) {
        this.default();
    }

    private async default() {
        const count = await this.prisma.language.count();
        if (count > 0) return;

        for (const language of this.languages) {
            await this.prisma.language.create({
                data: language,
            });
        }
    }
}
