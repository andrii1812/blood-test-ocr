
export interface ITestListEntry {
    id: string,
    date: string,
    tag: string | null,
    numValues: number
}

export interface ITestList {
    list: ITestListEntry[],
    loading: boolean
}