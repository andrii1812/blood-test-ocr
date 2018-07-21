import { ITestImage } from "./testImage";
import urls from "./urls";

export interface IBloodTest {
    id?: number,
    date: string,
    images: ITestImage[],
    values: string[][],
    tag?: string | null
}

export function ingestImage(file: File) {
    const data = new FormData();
    data.append('image', file);

    return fetch(urls.INGEST_IMAGE, {
        method: 'POST',
        body: data
    })
    .then(r => r.json());    
}

export function saveTest(test: IBloodTest) {
    return fetch(urls.TEST, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(test)
    }).then(x => x.text)
}