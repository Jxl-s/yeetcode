import { BaseRunner } from '../common/runner';
import { MetadataAlgo } from '../common/snippets';
import { v4 } from 'uuid';

export class CppRunner implements BaseRunner {
    public addAlgoCode(s: string, metadata: MetadataAlgo) {
        const separator = '===' + v4() + '===';
        const code = `${s}`;
        return [code, separator];
    }
}
