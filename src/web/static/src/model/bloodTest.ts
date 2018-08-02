import { ITestImage } from "./testImage";
import urls from "./urls";

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

export async function addPatchId(json: any) {
    const res = await fetch(urls.findTestId(json.date))
        .then(x => x.json());

    if (res) {
        json.patchId = res.id;
        json.tag = res.tag;
    }
}