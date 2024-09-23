import { MetadataAlgo } from '../common/snippets';
import { v4 } from 'uuid';

export class JavaRunner {
    public addAlgoCode(s: string, metadata: MetadataAlgo) {
        const separator = '===' + v4() + '===';
        const code = `${s}`;
        return [code, separator];
    }
}
