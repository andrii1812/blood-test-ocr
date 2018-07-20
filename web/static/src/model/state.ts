export interface State {
    file: File | null;
    ingestResults: IngestResult | null;
    referenceNames: string[]
}

export interface IngestResult {
    date: string;
    values: string[][];
    url: string;
}

export function initState(): State {
    return {
        file: null,
        ingestResults: null,
        referenceNames: []
    }
}