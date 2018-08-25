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


export interface IPatchResponse {
    patchId?: string,
    tag?: string
}

export async function getPatchId(date: string): Promise<IPatchResponse> {
    const res = await fetch(urls.findTestId(date))

    if (!res.ok) {
        return {};
    }

    const {id, tag} = await res.json();

    return {patchId: id, tag}
}
