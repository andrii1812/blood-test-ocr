import { ITestList } from "../../model/testList";
import { ActionType, getType } from "typesafe-actions";
import * as uploadImages from './actions';
import { IUploadedImagesState } from "../../model";

const initState = {
    images: [],
    upload: false,
    imagesLoaded: false,
}

export type UploadedImagesActions = ActionType<typeof uploadImages>

export default (state: IUploadedImagesState = initState, action: UploadedImagesActions): IUploadedImagesState => {
    switch(action.type) {
        case getType(uploadImages.loadImages):
            return {...state, images: [], imagesLoaded: false}
        case getType(uploadImages.saveImage):
            return {...state, upload: true}
        case getType(uploadImages.saveImageFinished):
            return {...state, upload: false}
        case getType(uploadImages.loadImagesFinished):
            return {...state, images: action.payload, imagesLoaded: true}
        case getType(uploadImages.deleteImageSuccess):
            if (!state.images) { 
                return state
            }

            const index = state.images.indexOf(action.payload)
            const list = [
                ...state.images.slice(0, index),
                ...state.images.slice(index + 1)
            ];
            return {...state, images: list}
        default:
            return state  
    }
}