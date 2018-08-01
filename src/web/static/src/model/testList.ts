
export interface ITestListEntry {
    id: string,
    date: string,
    tag: string | null,
    numValues: number,
    numImages: number
}

export interface ITestList {
    list: ITestListEntry[],
    loading: boolean
}