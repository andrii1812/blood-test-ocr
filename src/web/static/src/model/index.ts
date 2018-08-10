import { IIngestFileState } from "./ingestFile";
import { RouterState } from "react-router-redux";
import { IBloodTest } from "./bloodTest";
import { ITestList } from "./testList";
import { ITestImage } from "./testImage";
import { IGraphRequest, IGraphResponse } from "./statistics";

export * from "./bloodTest"
export * from "./testImage"
export * from "./ingestFile"
export * from "./statistics"

export enum ILoadingState {
    INITIAL,
    LOADING,
    LOAD_SUCCESS,
    LOAD_FAILURE
}

export interface ILoading<T> {
    value: T | null,
    state: ILoadingState
}

export interface IAddNewState {
    ingestFile: IIngestFileState,
    editValues: ILoading<IBloodTest>
}

export interface IAppValuesState {
    references: string[],
    tags: string[],
}

export interface IUploadedImagesState {
    images: ITestImage[] | null,
    upload: boolean,
    imagesLoaded: boolean
}

export interface IAppState {
    router: RouterState,
    app: IAppValuesState,
    addNew: IAddNewState,
    singleTest: ILoading<IBloodTest>,
    testList: ITestList,
    uploadedImages: IUploadedImagesState,
    parseExisting: ILoading<IBloodTest>,
    statistics: ILoading<IGraphResponse>
}

