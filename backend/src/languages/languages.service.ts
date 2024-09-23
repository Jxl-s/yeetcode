import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetadataAlgo, MetadataDesign } from './common/snippets';

import { Python3Runner, Python3Snippets } from './python3';
import { JavaSnippets } from './java';
import { JavaScriptSnippets } from './javascript';
import { CppSnippets } from './cpp';
import { BaseClasses } from './common/classes';

// TODO: Make runners for other languages
const LANGUAGES = [
    {
        id: 71,
        name: 'python3',
        display: 'Python3',
        snippets: new Python3Snippets(),
        runner: new Python3Runner(),
    },
    {
        id: 62,
        name: 'java',
        display: 'Java',
        snippets: new JavaSnippets(),
        runner: new Python3Runner(),
    },
    {
        id: 63,
        name: 'javascript',
        display: 'JavaScript',
        snippets: new JavaScriptSnippets(),
        runner: new Python3Runner(),
    },
    {
        id: 54,
        name: 'cpp',
        display: 'C++',
        snippets: new CppSnippets(),
        runner: new Python3Runner(),
    },
] as const;

export function getLanguageArr() {
    return LANGUAGES.map((language) => language.name);
}

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

    public getLanguages() {
        return {
            data: LANGUAGES.map((language) => ({
                name: language.name,
                display: language.display,
            })),
        };
    }

    private generateCommentString(
        metadataTypes: string[],
        languageSnippets: (typeof LANGUAGES)[number]['snippets'],
    ): string {
        const comments = [];
        const listNode =
            BaseClasses.ListNodeDef + '\n' + languageSnippets.classes.ListNode;

        const treeNode =
            BaseClasses.TreeNodeDef + '\n' + languageSnippets.classes.TreeNode;

        if (metadataTypes.includes('ListNode')) comments.push(listNode);
        if (metadataTypes.includes('TreeNode')) comments.push(treeNode);

        if (comments.length === 0) {
            return '';
        }

        return languageSnippets.makeComment(comments.join('\n\n')) + '\n';
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
                    let result = language.snippets.makeAlgo(metadata);
                    const commentString = this.generateCommentString(
                        metadata.types,
                        language.snippets,
                    );
                    result = commentString + result;
                    snippets[language.name] = result;
                }
            }

            if (problem === 'DESIGN') {
                const metadata = MetadataDesign.fromObject(JSON.parse(data));

                for (const language of LANGUAGES) {
                    let result = language.snippets.makeDesign(metadata);
                    const commentString = this.generateCommentString(
                        metadata.types,
                        language.snippets,
                    );
                    result = commentString + result;
                    snippets[language.name] = result;
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            return snippets;
        }
    }

    public getLanguageId(name: (typeof LANGUAGES)[number]['name']) {
        return LANGUAGES.find((language) => language.name === name).id;
    }

    public makeAlgoRunner(
        code: string,
        language: (typeof LANGUAGES)[number]['name'],
        metadata: MetadataAlgo,
    ) {
        const lang = LANGUAGES.find((lang) => lang.name === language);
        if (!lang) {
            throw new Error('Language not found');
        }

        return lang.runner.addAlgoCode(code, metadata);
    }

    public extractAlgoOutput(output: string, separator: string) {
        const stdout = output.split(separator);
        const results = stdout.pop().trim().split('\n');

        return { results, stdout: stdout.map((s) => s.trim()) };
    }
}
