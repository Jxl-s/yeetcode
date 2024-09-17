import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

enum Type {
    ARRAY = 'array',
    INT = 'int',
    FLOAT = 'float',
    STR = 'str',
    BOOL = 'bool',
    LISTNODE = 'listnode',
    TREENODE = 'treenode',
}

class T {
    public name?: string;
    public type: Type;
    public items?: T;

    constructor({
        name,
        type,
        items,
    }: {
        name?: string;
        type: Type;
        items?: T;
    }) {
        this.name = name;
        this.type = type;
        this.items = items;
    }

    public static fromObject(obj: any): T {
        return new T({
            name: obj.name,
            type: obj.type,
            items: obj.items ? T.fromObject(obj.items) : undefined,
        });
    }

    public serialize(): string {
        const result: any = {};
        if (this.name !== undefined) result.name = this.name;
        if (this.type !== undefined) result.type = this.type;
        if (this.items !== undefined) result.items = this.items.serialize();
        return result;
    }

    public static toPython(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `List[${T.toPython(t.items)}]`;
            case Type.INT:
                return 'int';
            case Type.FLOAT:
                return 'float';
            case Type.STR:
                return 'str';
            case Type.BOOL:
                return 'bool';
            case Type.LISTNODE:
                return 'Optional[ListNode]';
            case Type.TREENODE:
                return 'Optional[TreeNode]';
            default:
                return t.type;
        }
    }

    public static toJava(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `${T.toJava(t.items)}[]`;
            case Type.INT:
                return 'int';
            case Type.FLOAT:
                return 'double';
            case Type.STR:
                return 'String';
            case Type.BOOL:
                return 'boolean';
            case Type.LISTNODE:
                return 'ListNode';
            case Type.TREENODE:
                return 'TreeNode';
            default:
                return t.type;
        }
    }

    public static toJavaScript(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `${T.toJavaScript(t.items)}[]`;
            case Type.INT:
                return 'number';
            case Type.FLOAT:
                return 'number';
            case Type.STR:
                return 'string';
            case Type.BOOL:
                return 'boolean';
            case Type.LISTNODE:
                return 'ListNode';
            case Type.TREENODE:
                return 'TreeNode';
            default:
                return t.type;
        }
    }
}

class MetadataAlgo {
    public function: string;
    public return: T;
    public arguments: T[];

    constructor({
        function: func,
        return: ret,
        arguments: args,
    }: {
        function: string;
        return: T;
        arguments: T[];
    }) {
        this.function = func;
        this.return = ret;
        this.arguments = args;
    }

    public serialize() {
        return {
            function: this.function,
            return: this.return.serialize(),
            arguments: this.arguments.map((arg) => arg.serialize()),
        };
    }

    public static fromObject(obj: any): MetadataAlgo {
        return new MetadataAlgo({
            function: obj.function,
            return: T.fromObject(obj.return),
            arguments: obj.arguments.map((arg: any) => T.fromObject(arg)),
        });
    }
}

const SNIPPET_PYTHON = [
    'class Solution():',
    '    def {{__function_name__}}(self, {{__function_args__}}) -> {{__function_return__}}:',
    '        ',
].join('\n');

const SNIPPET_JAVA = [
    'public class Solution {',
    '    public {{__function_return__}} {{__function_name__}}({{__function_args__}}) {',
    '        ',
    '    }',
    '}',
].join('\n');

const SNIPPET_JAVASCRIPT = [
    '/**',
    '{{__function_types__}}',
    ' * @return {{{__function_return__}}}',
    ' */',
    'var {{__function_name__}} = ({{__function_args__}}) {',
    '   ',
    '};',
].join('\n');

class Snippets {
    constructor(private metadata: MetadataAlgo) {}

    private _makePython() {
        let snippet = SNIPPET_PYTHON;
        snippet = snippet.replace(
            '{{__function_name__}}',
            this.metadata.function,
        );
        snippet = snippet.replace(
            '{{__function_args__}}',
            this.metadata.arguments
                .map((arg) => `${arg.name}: ${T.toPython(arg)}`)
                .join(', '),
        );

        snippet = snippet.replace(
            '{{__function_return__}}',
            T.toPython(this.metadata.return),
        );

        return snippet;
    }

    private _makeJava() {
        let snippet = SNIPPET_JAVA;
        snippet = snippet.replace(
            '{{__function_name__}}',
            this.metadata.function,
        );
        snippet = snippet.replace(
            '{{__function_args__}}',
            this.metadata.arguments
                .map((arg) => `${T.toJava(arg)} ${arg.name}`)
                .join(', '),
        );

        snippet = snippet.replace(
            '{{__function_return__}}',
            T.toJava(this.metadata.return),
        );
        return snippet;
    }

    private _makeJavaScript() {
        let snippet = SNIPPET_JAVASCRIPT;
        snippet = snippet.replace(
            '{{__function_name__}}',
            this.metadata.function,
        );
        snippet = snippet.replace(
            '{{__function_args__}}',
            this.metadata.arguments
                .map((arg) => `${arg.name}`)
                .join(', '),
        );

        snippet = snippet.replace(
            '{{__function_return__}}',
            T.toJavaScript(this.metadata.return),
        );

        const types = this.metadata.arguments
            .map((arg) => ` * @param {${T.toJavaScript(arg)}} ${arg.name}`)
            .join('\n');
        snippet = snippet.replace('{{__function_types__}}', types);

        return snippet;
    }

    public makeSnippets() {
        return {
            python: this._makePython(),
            java: this._makeJava(),
            javascript: this._makeJavaScript(),
        };
    }
}

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

    private async default() {
        const count = await this.prisma.language.count();
        if (count > 0) return;

        for (const language of this.languages) {
            await this.prisma.language.create({
                data: language,
            });
        }
    }

    public makeSnippets(problem: 'ALGO' | 'DESIGN', data: string) {
        try {
            const metadata = MetadataAlgo.fromObject(JSON.parse(data));
            const snippets = new Snippets(metadata);

            if (problem === 'ALGO') {
                return snippets.makeSnippets();
            }
        } catch (error) {
            throw new Error('Invalid data');
        }
    }
}
