import { BaseClasses } from '../common/classes';
import {
    BaseSnippets,
    Method,
    T,
    Type,
    MetadataAlgo,
    MetadataDesign,
} from '../common/snippets';
import { Python3Classes } from './classes';

export class Python3Snippets implements BaseSnippets {
    public classes = Python3Classes;

    private static typeParser(t: T) {
        switch (t.type) {
            case Type.ARRAY:
                return `List[${Python3Snippets.typeParser(t.items)}]`;
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

    private static methodParser(method: Method) {
        let argList = method.args
            .map((arg) => `${arg.name}: ${Python3Snippets.typeParser(arg)}`)
            .join(', ');

        if (argList !== '') {
            argList = 'self, ' + argList;
        } else {
            argList = 'self';
        }

        let snippet = `def ${method.name}(${argList}) -> ${Python3Snippets.typeParser(method.returnType)}:`;
        if (method.name === '__init__') {
            snippet = `def __init__(${argList}):`;
        }

        snippet += '\n\t';
        return snippet;
    }

    public makeComment(comment: string) {
        return comment
            .split('\n')
            .map((line) => `# ${line}`)
            .join('\n');
    }

    public makeAlgo(metadata: MetadataAlgo) {
        let snippet = 'class Solution:\n';

        const method = new Method({
            className: 'Solution',
            name: metadata.function,
            returnType: metadata.return,
            args: metadata.args,
        });

        snippet += Method.indent(Python3Snippets.methodParser(method));
        return snippet;
    }

    public makeDesign(metadata: MetadataDesign) {
        let snippet = `class ${metadata.className}:\n`;

        const methods = metadata.methods.map((method) => {
            const m = new Method({
                className: metadata.className,
                name: method.function,
                returnType: method.return,
                args: method.args,
            });

            return Method.indent(Python3Snippets.methodParser(m));
        });

        snippet += methods.join('\n\n') + '\n';
        return snippet;
    }
}
