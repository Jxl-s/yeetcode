import { MetadataAlgo } from '../common/snippets';
import { v4 } from 'uuid';

export class JavaScriptRunner {
    public addAlgoCode(s: string, metadata: MetadataAlgo) {
        const separator = '===' + v4() + '===';
        const code = `
let { ListNode, deserializeList, serializeList } = require("./yeetcode/listnode");
let { TreeNode, deserializeTree, serializeTree } = require("./yeetcode/treenode");
let { serialize, deserialize } = require("./yeetcode/util");

${s}

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const inputLines = [];

rl.on('line', (line) => {
    inputLines.push(line);
});

rl.on('close', () => {
    const output = fs.createWriteStream('user.out', { flags: 'w' });

    inputLines.forEach((line, i) => {
        const data = JSON.parse(line);

${metadata.args.map((arg, i) => `        const arg_${i + 1} = deserialize(data['${arg.name}'], ${JSON.stringify(arg.serialize())}`).join('\n')});

        const result = ${metadata.function}(${metadata.args.map((_, i) => `arg_${i + 1}`).join(', ')});
        const serializedResult = serialize(result, ${JSON.stringify(metadata.return.serialize())});
        console.log("${separator}");
        const resultStr = JSON.stringify(serializedResult);
        output.write(resultStr + '\\n');
    });

    output.end(() => {
        fs.readFile('user.out', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    });
});
        `;
        return [code, separator];
    }
}
