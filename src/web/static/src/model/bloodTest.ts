import { ITestImage } from "./testImage";

export interface IBloodTest {
    id?: string,
    date: string,
    images: ITestImage[],
    values: string[][],
    tag?: string,
    patchId?: string
}

export const initialBloodTest = () => ({
    date: '',
    images: [],
    values: []
})