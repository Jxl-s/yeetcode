import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetadataAlgo, MetadataDesign } from './common/snippets';

import { Python3Snippets } from './python3';
import { JavaSnippets } from './java';
import { JavaScriptSnippets } from './javascript';

const LANGUAGES = [
    {
        id: 71,
        name: 'python3',
        display: 'Python3',

        snippets: new Python3Snippets(),
    },
    {
        id: 62,
        name: 'java',
        display: 'Java',
        snippets: new JavaSnippets(),
    },
    {
        id: 63,
        name: 'javascript',
        display: 'JavaScript',
        snippets: new JavaScriptSnippets(),
    },
] as const;

@Injectable()
export class LanguagesService {
    constructor(private readonly prisma: PrismaService) {
        this.default();
    }

    // To enforce relations in the database
    private async default() {
        const upsertOperations = LANGUAGES.map((language) => {
            return this.prisma.language.upsert({
                where: { id: language.id },
                update: {},
                create: {
                    id: language.id,
                    name: language.name,
                },
            });
        });

        await this.prisma.$transaction(upsertOperations);
    }

    public makeSnippets(problem: 'ALGO' | 'DESIGN', data: string) {
        // Create the snippets object
        const snippets: Record<string, string> = {};
        for (const { name } of LANGUAGES) {
            snippets[name] = '';
        }

        try {
            if (problem === 'ALGO') {
                const metadata = MetadataAlgo.fromObject(JSON.parse(data));

                for (const language of LANGUAGES) {
                    const result = language.snippets.makeAlgo(metadata);
                    snippets[language.name] = result;
                }
            }

            if (problem === 'DESIGN') {
                const metadata = MetadataDesign.fromObject(JSON.parse(data));

                for (const language of LANGUAGES) {
                    const result = language.snippets.makeDesign(metadata);
                    snippets[language.name] = result;
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            return snippets;
        }
    }
}
