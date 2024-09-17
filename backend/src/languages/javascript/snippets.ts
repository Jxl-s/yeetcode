import {
    BaseSnippets,
    MetadataAlgo,
    MetadataDesign,
    Method,
    T,
    Type,
} from '../common/snippets';

export class JavaScriptSnippets implements BaseSnippets {
    private typeParser(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `${this.typeParser(t.items)}[]`;
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

    private methodParser(method: Method, isConstructor = false) {
        const argList = method.args.map((arg) => arg.name).join(', ');
        const types = method.args
            .map((arg) => ` * @param {${this.typeParser(arg)}} ${arg.name}`)
            .join('\n');

        // Add JSDoc
        let snippet = '/**';
        snippet += `\n${types}`;
        if (method.name !== '__init__') {
            snippet +=
                '\n * @return {' + this.typeParser(method.returnType) + '}';
        }

        snippet += '\n */';

        // Function body
        if (method.name === '__init__') {
            snippet += `\nvar ${method.className} = function(${argList}) {`;
        } else if (isConstructor) {
            snippet += `\nvar ${method.name} = function(${argList}) {`;
        } else {
            snippet += `\n${method.className}.prototype.${method.name} = function(${argList}) {`;
        }

        snippet += '\n\t';
        snippet += '\n};';
        return snippet;
    }

    public makeAlgo(metadata: MetadataAlgo) {
        const method = new Method({
            name: metadata.function,
            args: metadata.args,
            returnType: metadata.return,
            className: 'Solution',
        });

        return this.methodParser(method, true);
    }

    public makeDesign(metadata: MetadataDesign) {
        let snippet = '';

        const methods = metadata.methods.map((method) => {
            const m = new Method({
                name: method.function,
                args: method.args,
                returnType: method.return,
                className: metadata.className,
            });

            return this.methodParser(m);
        });

        snippet += methods.join('\n\n') + '\n';
        return snippet;
    }
}
