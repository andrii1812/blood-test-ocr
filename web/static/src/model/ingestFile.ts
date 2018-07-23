
export interface IUploadFile {
    url: string,
    filename: string
}

export interface IIngestFileState {
    file: IUploadFile | null;
    loading: boolean
}

export const getIngestFileState = (): IIngestFileState => ({
    file: null,
    loading: false
})