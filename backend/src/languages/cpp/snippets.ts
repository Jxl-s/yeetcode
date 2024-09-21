import { BaseClasses } from '../common/classes';
import {
    BaseSnippets,
    MetadataAlgo,
    MetadataDesign,
    Method,
    T,
    Type,
} from '../common/snippets';
import { CppClasses } from './classes';

export class CppSnippets implements BaseSnippets {
    private static typeParser(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `vector<${CppSnippets.typeParser(t.items)}>`;
            case Type.INT:
                return 'int';
            case Type.FLOAT:
                return 'double';
            case Type.STR:
                return 'string';
            case Type.BOOL:
                return 'bool';
            case Type.LISTNODE:
                return 'ListNode*';
            case Type.TREENODE:
                return 'TreeNode*';
            case Type.VOID:
                return 'void';
            default:
                return t.type;
        }
    }

    private static methodParser(method: Method) {
        const argList = method.args
            .map((arg) => `${CppSnippets.typeParser(arg)} ${arg.name}`)
            .join(', ');

        let snippet = '';
        if (method.name === '__init__') {
            snippet += `${method.className}(${argList}) {`;
        } else {
            snippet += `${CppSnippets.typeParser(method.returnType)} ${method.name}(${argList}) {`;
        }

        snippet += '\n\t';
        snippet += '\n}';
        return snippet;
    }

    private makeComment(metadata: MetadataAlgo | MetadataDesign) {
        if (metadata.types.find((t) => t === 'listnode')) {
            let comment = `/**`;
            comment += `\n * ${BaseClasses.ListNode}`;
            comment += CppClasses.ListNode.split('\n')
                .map((line) => `\n * ${line}`)
                .join('');
            comment += '\n */';
            return comment;
        }

        if (metadata.types.find((t) => t === 'treenode')) {
            let comment = `/**`;
            comment += `\n * ${BaseClasses.TreeNode}`;
            comment += CppClasses.TreeNode.split('\n')
                .map((line) => `\n * ${line}`)
                .join('');
            comment += '\n */';
            return comment;
        }

        return '';
    }

    public makeAlgo(metadata: MetadataAlgo) {
        let snippet = 'class Solution {\npublic:\n';

        const method = new Method({
            name: metadata.function,
            args: metadata.args,
            returnType: metadata.return,
            className: 'Solution',
        });

        snippet += Method.indent(CppSnippets.methodParser(method));
        snippet += '\n};';

        const comments = this.makeComment(metadata);
        if (comments) {
            return comments + '\n' + snippet;
        }

        return snippet;
    }

    public makeDesign(metadata: MetadataDesign) {
        let snippet = `class ${metadata.className} {\npublic:\n`;

        const methods = metadata.methods.map((method) => {
            const m = new Method({
                name: method.function,
                args: method.args,
                returnType: method.return,
                className: metadata.className,
            });

            return Method.indent(CppSnippets.methodParser(m));
        });

        snippet += methods.join('\n\n') + '\n};';

        const comments = this.makeComment(metadata);
        if (comments) {
            return comments + '\n' + snippet;
        }

        return snippet;
    }
}
