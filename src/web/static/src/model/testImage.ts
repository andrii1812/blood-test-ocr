export interface ITestImage {
    id?: number,
    path: string,
    width?: number,
    height?: number
}

function getAspect(image: ITestImage) {
    if(!image.width || ! image.height) {
        throw new Error('image widthout dimentions');
    }

    return image.width / image.height;
}

export function getScaledHeight(image: ITestImage, width: number) {
    const aspect = getAspect(image);
    return width / aspect;
}

export function getScaledWidth(image: ITestImage, height: number) {
    const aspect = getAspect(image);
    return height * aspect;
}