import { IIngestFileState } from "./ingestFile";
import { RouterState } from "react-router-redux";
import { IBloodTest } from "./bloodTest";

export * from "./bloodTest"
export * from "./testImage"
export * from "./ingestFile"

export interface IAppState {
    router: RouterState,
    references: string[],
    addNew: {
        ingestFile: IIngestFileState,
        editValues: IBloodTest | null
    }
}

