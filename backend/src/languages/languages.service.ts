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
    VOID = 'void',
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
            case Type.VOID:
                return 'None';
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
            case Type.VOID:
                return 'void';
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
            case Type.VOID:
                return 'void';
            default:
                return t.type;
        }
    }
}

class MetadataAlgo {
    public function: string;
    public return: T;
    public args: T[];

    constructor({
        function: func,
        return: ret,
        args: args,
    }: {
        function: string;
        return: T;
        args: T[];
    }) {
        this.function = func;
        this.return = ret;
        this.args = args;
    }

    public serialize() {
        return {
            function: this.function,
            return: this.return.serialize(),
            args: this.args.map((arg) => arg.serialize()),
        };
    }

    public static fromObject(obj: any): MetadataAlgo {
        return new MetadataAlgo({
            function: obj.function,
            return: T.fromObject(obj.return),
            args: obj.args.map((arg: any) => T.fromObject(arg)),
        });
    }
}

class MetadataDesign {
    public className: string;
    public methods: MetadataAlgo[];

    constructor({
        className,
        methods,
    }: {
        className: string;
        methods: MetadataAlgo[];
    }) {
        this.className = className;
        this.methods = methods;
    }

    public serialize() {
        return {
            className: this.className,
            methods: this.methods.map((method) => method.serialize()),
        };
    }

    public static fromObject(obj: any): MetadataDesign {
        return new MetadataDesign({
            className: obj.className,
            methods: obj.methods.map((method: any) =>
                MetadataAlgo.fromObject(method),
            ),
        });
    }
}

class Method {
    public className: string;
    public name: string;
    public returnType: T;
    public args: T[];

    constructor({
        className = 'Solution',
        name,
        returnType,
        args,
    }: {
        className?: string;
        name: string;
        returnType: T;
        args: T[];
    }) {
        this.className = className;
        this.name = name;
        this.returnType = returnType;
        this.args = args;
    }

    public static indent(code: string) {
        return code
            .split('\n')
            .map((line) => '\t' + line)
            .join('\n');
    }

    public serialize() {
        return {
            className: this.className,
            name: this.name,
            returnType: this.returnType.serialize(),
            args: this.args.map((arg) => arg.serialize()),
        };
    }

    public static fromObject(obj: any): Method {
        return new Method({
            className: obj.className,
            name: obj.name,
            returnType: T.fromObject(obj.returnType),
            args: obj.args.map((arg: any) => T.fromObject(arg)),
        });
    }

    public toPython() {
        let argList = this.args
            .map((arg) => `${arg.name}: ${T.toPython(arg)}`)
            .join(', ');

        if (argList !== '') {
            argList = 'self, ' + argList;
        } else {
            argList = 'self';
        }

        let snippet = `def ${this.name}(${argList}) -> ${T.toPython(this.returnType)}:`;
        if (this.name === '__init__') {
            snippet = `def __init__(${argList}):`;
        }

        snippet += '\n\t';

        return snippet;
    }

    public toJava() {
        const argList = this.args
            .map((arg) => `${T.toJava(arg)} ${arg.name}`)
            .join(', ');

        let methodName = this.name;
        let snippet = `public ${T.toJava(this.returnType)} ${this.name}(${argList}) {`;

        if (methodName === '__init__') {
            methodName = this.className;
            snippet = `public ${this.className}(${argList}) {`;
        }

        snippet += '\n\t';
        snippet += '\n}';

        return snippet;
    }

    public toJavaScript() {
        const argList = this.args.map((arg) => arg.name).join(', ');
        const types = this.args
            .map((arg) => ` * @param {${T.toJavaScript(arg)}} ${arg.name}`)
            .join('\n');

        // Add JSDoc
        let snippet = '/**';
        snippet += `\n${types}`;
        if (this.name !== '__init__') {
            snippet += '\n * @return {' + T.toJavaScript(this.returnType) + '}';
        }

        snippet += '\n */';

        // Function body
        if (this.name === '__init__') {
            snippet += `\nvar ${this.className} = function(${argList}) {`;
        } else {
            snippet += `\n${this.className}.prototype.${this.name} = function(${argList}) {`;
        }

        snippet += '\n\t';
        snippet += '\n};';
        return snippet;
    }
}

class SnippetsAlgo {
    private method: Method;
    constructor(metadata: MetadataAlgo) {
        this.method = new Method({
            className: 'Solution',
            name: metadata.function,
            returnType: metadata.return,
            args: metadata.args,
        });
    }

    private _makePython() {
        let snippet = 'class Solution():\n';
        snippet += Method.indent(this.method.toPython());

        return snippet;
    }

    private _makeJava() {
        let snippet = 'class Solution {\n';
        snippet += Method.indent(this.method.toJava());
        snippet += '\n}';

        return snippet;
    }

    private _makeJavaScript() {
        return this.method.toJavaScript();
    }

    public makeSnippets() {
        return {
            python: this._makePython(),
            java: this._makeJava(),
            javascript: this._makeJavaScript(),
        };
    }
}

class SnippetsDesign {
    private className: string;
    private methods: Method[];

    constructor(metadata: MetadataDesign) {
        this.className = metadata.className;
        this.methods = metadata.methods.map((method) => {
            return new Method({
                className: metadata.className,
                name: method.function,
                returnType: method.return,
                args: method.args,
            });
        });
    }

    private _makePython() {
        let snippet = `class ${this.className}():\n`;

        const methods = this.methods.map((method) =>
            Method.indent(method.toPython()),
        );
        snippet += methods.join('\n\n') + '\n';

        return snippet;
    }

    private _makeJava() {
        let snippet = `class ${this.className} {\n`;

        const methods = this.methods.map((method) =>
            Method.indent(method.toJava()),
        );
        snippet += methods.join('\n\n') + '\n}\n';

        return snippet;
    }

    private _makeJavaScript() {
        let snippet = '';

        const methods = this.methods.map((method) => method.toJavaScript());
        snippet += methods.join('\n\n') + '\n';

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
            if (problem === 'ALGO') {
                const metadata = MetadataAlgo.fromObject(JSON.parse(data));
                const snippets = new SnippetsAlgo(metadata);
                return snippets.makeSnippets();
            }

            if (problem === 'DESIGN') {
                const metadata = MetadataDesign.fromObject(JSON.parse(data));
                const snippets = new SnippetsDesign(metadata);
                console.log(snippets, snippets.makeSnippets());
                return snippets.makeSnippets();
            }
        } catch (error) {
            throw new Error('Invalid data');
        }
    }
}
