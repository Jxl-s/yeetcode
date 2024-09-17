import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    MetadataAlgo,
    MetadataDesign,
    SnippetsAlgo,
    SnippetsDesign,
} from 'src/utils/snippets';

@Injectable()
export class LanguagesService {
    private languages = [
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

    // To enforce relations in the database
    private async default() {
        const upsertOperations = this.languages.map((language) => {
            return this.prisma.language.upsert({
                where: { id: language.id },
                update: {},
                create: language,
            });
        });

        await this.prisma.$transaction(upsertOperations);
    }

    public makeSnippets(problem: 'ALGO' | 'DESIGN', data: string) {
        try {
            if (problem === 'ALGO') {
                const metadata = MetadataAlgo.fromObject(JSON.parse(data));
                const snippets = new SnippetsAlgo(metadata);
                return snippets.makeSnippets();
            }

            if (problem === 'DESIGN') {
                const metadata = MetadataDesign.fromObject(JSON.parse(data));
                const snippets = new SnippetsDesign(metadata);
                return snippets.makeSnippets();
            }
        } catch (error) {
            return {
                python: '',
                java: '',
                javascript: '',
            };
        }
    }
}
