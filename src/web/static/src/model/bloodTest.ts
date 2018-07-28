import { ITestImage } from "./testImage";

export interface IBloodTest {
    id?: number,
    date: string,
    images: ITestImage[],
    values: string[][],
    tag?: string | null,
    patchId?: string
}

export const initialBloodTest = () => ({
    date: '',
    images: [],
    values: []
})