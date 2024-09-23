import { MetadataAlgo } from './snippets';

export abstract class BaseRunner {
    public abstract addAlgoCode(s: string, metadata: MetadataAlgo): string[];
}
