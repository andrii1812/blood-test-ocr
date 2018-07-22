import urls from "./urls";
import { IBloodTest } from ".";

export interface IAddNewState {
    file: File | null;
    ingestResults: IBloodTest | null;
    step: number,
    saveId: string | null,
    loading: boolean
}

export const getAddNewInitialState = (): IAddNewState => ({
    file: null,
    ingestResults: null,
    step: 0,
    saveId: null,
    loading: false
})

export function loadReferenceNames(): Promise<string[]> {
    return fetch(urls.REFERENCE_NAMES)
        .then(x => x.json());        
}