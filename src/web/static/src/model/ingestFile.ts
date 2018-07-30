
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

export async function getFileFromBlobUrl(fileObj: IUploadFile): Promise<File> {
    const file = await fetch(fileObj.url)
                        .then(x => x.blob());

    return new File([file], fileObj.filename);
}