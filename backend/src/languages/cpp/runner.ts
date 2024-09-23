import { MetadataAlgo } from '../common/snippets';
import { v4 } from 'uuid';

export class CppRunner {
    public addAlgoCode(s: string, metadata: MetadataAlgo) {
        const separator = '===' + v4() + '===';
        const code = `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "json.hpp"
#include "listnode.h"
#include "treenode.h"
#include "util.h"

${s}

int main() {
    std::ifstream input("user.in");
    std::ofstream output("user.out");
    std::string line;
    json data;

    while (std::getline(input, line)) {
        data = json::parse(line);

${metadata.args.map((arg, i) => `        auto arg_${i + 1} = deserialize<${arg.type}>(data["${arg.name}"]);`).join('\n')}

        auto result = Solution().${metadata.function}(${metadata.args.map((_, i) => `arg_${i + 1}`).join(', ')});
        auto serialized_result = serialize(result);
        output << "${separator}" << std::endl;
        output << serialized_result.dump() << std::endl;
    }

    input.close();
    output.close();

    std::ifstream output_read("user.out");
    std::string output_content((std::istreambuf_iterator<char>(output_read)), std::istreambuf_iterator<char>());
    std::cout << output_content;

    return 0;
}
`;
        return [code, separator];
    }

    public parseAlgoOutput(output: string, separator: string) {
        const stdout = output.split(separator);
        const results = stdout.pop().trim();

        return { results, stdout: stdout.map((s) => s.trim()) };
    }
}
