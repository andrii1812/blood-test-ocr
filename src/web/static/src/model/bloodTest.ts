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

export const initialBloodTest = () : IBloodTest => ({
    date: '',
    tag: 'None',
    images: [],
    values: []
})

export async function addPatchId(json: any) {
    const res = await fetch(urls.findTestId(json.date))

    if (!res.ok) {
        return;
    }

    const resJson = await res.json();

    json.patchId = resJson.id;
    json.tag = resJson.tag;
}
