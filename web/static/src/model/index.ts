import { IAddNewState, getAddNewInitialState } from "./addNewState";

export * from "./bloodTest"
export * from "./testImage"
export * from "./addNewState"

export interface IAppState {
    referenceNames: string[],
}

export function initState(): IAppState {
    return {
        referenceNames: []
    }
}

