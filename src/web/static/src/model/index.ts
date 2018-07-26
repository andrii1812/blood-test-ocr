import { IIngestFileState } from "./ingestFile";
import { RouterState } from "react-router-redux";
import { IBloodTest } from "./bloodTest";
import { ITestList } from "./testList";

export * from "./bloodTest"
export * from "./testImage"
export * from "./ingestFile"

export interface IAddNewState {
    ingestFile: IIngestFileState,
    editValues: IBloodTest | null
}

export interface IAppState {
    router: RouterState,
    references: string[],
    addNew: IAddNewState,
    singleTest: IBloodTest | null,
    testList: ITestList
}

