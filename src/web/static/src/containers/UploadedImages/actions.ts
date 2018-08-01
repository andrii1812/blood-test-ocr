import { createStandardAction } from "typesafe-actions";
import { IUploadFile, ITestImage } from "../../model";

export const saveImage = createStandardAction('SAVE_IMAGE')<IUploadFile>();
export const saveImageFinished = createStandardAction('SAVE_IMAGE_FINISHED')();
export const loadImages = createStandardAction('LOAD_IMAGES')();
export const loadImagesFinished = createStandardAction('LOAD_IMAGES_FINISHED')<ITestImage[]>();

export const deleteImage = createStandardAction('DELETE_IMAGE')<ITestImage>();
export const deleteImageSuccess = createStandardAction('DELETE_IMAGE_SUCCESS')<ITestImage>();
export const deleteImageFailure = createStandardAction('DELETE_IMAGE_FAILURE')();
