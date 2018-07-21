import { IBloodTest } from "./bloodTest";
import urls from "./urls";

export * from "./bloodTest"
export * from "./testImage"

export interface IAppState {
    file: File | null;
    ingestResults: IBloodTest | null;
    referenceNames: string[],
    step: number
}

export function initState(): IAppState {
    return {
        file: null,
        ingestResults: null,
        referenceNames: [],
        step: 0
    }
}

export function loadReferenceNames(): Promise<string[]> {
    return fetch(urls.REFERENCE_NAMES)
        .then(x => x.json());        
}
