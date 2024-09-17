export enum Type {
    ARRAY = 'array',
    INT = 'int',
    FLOAT = 'float',
    STR = 'str',
    BOOL = 'bool',
    LISTNODE = 'listnode',
    TREENODE = 'treenode',
    VOID = 'void',
}

export class T {
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
}

export class Method {
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
}

export class MetadataAlgo {
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

export class MetadataDesign {
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
