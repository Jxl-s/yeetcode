import {
    MetadataAlgo,
    MetadataDesign,
    BaseSnippets,
    Method,
    T,
    Type,
} from '../common/snippets';

export class JavaSnippets implements BaseSnippets {
    private static typeParser(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `${JavaSnippets.typeParser(t.items)}[]`;
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

    private static methodParser(method: Method) {
        const argList = method.args
            .map((arg) => `${JavaSnippets.typeParser(arg)} ${arg.name}`)
            .join(', ');

        let methodName = method.name;
        let snippet = `public ${JavaSnippets.typeParser(method.returnType)} ${method.name}(${argList}) {`;

        if (methodName === '__init__') {
            methodName = method.className;
            snippet = `public ${method.className}(${argList}) {`;
        }

        snippet += '\n\t';
        snippet += '\n}';

        return snippet;
    }

    public makeAlgo(metadata: MetadataAlgo) {
        let snippet = 'class Solution {\n';

        const method = new Method({
            className: 'Solution',
            name: metadata.function,
            returnType: metadata.return,
            args: metadata.args,
        });

        snippet += Method.indent(JavaSnippets.methodParser(method));
        snippet += '\n}';

        return snippet;
    }

    public makeDesign(metadata: MetadataDesign) {
        let snippet = `class ${metadata.className} {\n`;

        const methods = metadata.methods.map((method) => {
            const m = new Method({
                className: metadata.className,
                name: method.function,
                returnType: method.return,
                args: method.args,
            });

            return Method.indent(JavaSnippets.methodParser(m));
        });

        snippet += methods.join('\n\n') + '\n}\n';
        return snippet;
    }
}
