import { IIngestFileState } from "./ingestFile";
import { RouterState } from "react-router-redux";
import { IBloodTest } from "./bloodTest";
import { ITestList } from "./testList";
import { ITestImage } from "./testImage";

export * from "./bloodTest"
export * from "./testImage"
export * from "./ingestFile"

export enum TestEditLoading {
    INITIAL,
    LOADING,
    LOAD_SUCCESS,
    LOAD_FAILURE
}

export interface ITestEditState {
    test: IBloodTest | null,
    state: TestEditLoading
}

export interface IAddNewState {
    ingestFile: IIngestFileState,
    editValues: ITestEditState
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
    singleTest: ITestEditState,
    testList: ITestList,
    uploadedImages: IUploadedImagesState,
    parseExisting: ITestEditState,
}

