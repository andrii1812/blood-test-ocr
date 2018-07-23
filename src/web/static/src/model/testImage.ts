export interface ITestImage {
    id?: number,
    path: string,
    width?: number,
    height?: number
}

export function getScaledHeight(image: ITestImage, width: number) {
    if(!image.width || ! image.height) {
        throw new Error('image widthout dimentions');
    }

    const aspect = image.width / image.height;
    return width / aspect
}