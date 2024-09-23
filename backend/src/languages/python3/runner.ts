import { MetadataAlgo } from '../common/snippets';
import { v4 } from 'uuid';
export class Python3Runner {
    public addAlgoCode(s: string, metadata: MetadataAlgo) {
        const separator = '===' + v4() + '===';
        const code = `from typing import *

from yeetcode.listnode import ListNode
from yeetcode.treenode import TreeNode
from yeetcode.util import serialize, deserialize

${s}

import json
import sys

with open('user.out', 'w') as f:
    for i, data in enumerate(map(json.loads, sys.stdin)):
${metadata.args.map((arg, i) => `        arg_${i + 1} = deserialize(data['${arg.name}'], '${arg.type}')`).join('\n')}

        result = Solution().${metadata.function}(${metadata.args.map((_, i) => `arg_${i + 1}`).join(', ')})
        result = serialize(result, '${metadata.return.type}')
        print("${separator}")
        result_str = json.dumps(result)
        print(result_str, file=f)

with open('user.out', 'r') as f:
    print(f.read())
`;
        return [code, separator];
    }

    public parseAlgoOutput(output: string, separator: string) {
        const stdout = output.split(separator);
        const results = stdout.pop().trim();

        return { results, stdout: stdout.map((s) => s.trim()) };
    }
}
