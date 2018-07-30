import { ActionsObservable, ofType, combineEpics } from "redux-observable";
import { AnyAction, MiddlewareAPI } from "redux";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import { flatMap } from "rxjs/operators";
import urls from "../../model/urls";
import { loadImages, loadImagesFinished, saveImage, saveImageFinished } from "./actions";
import { IUploadFile, getFileFromBlobUrl, ITestImage } from "../../model";

const loadListEpic = (action$: ActionsObservable<AnyAction>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(loadImages)),
        flatMap(_ => 
            fetch(urls.IMAGE)
                .then(x => x.json())
                .then(x => x.filter((t: any) => t.tests === 0))
                .then(x => loadImagesFinished(x))
        )
    )
}

async function saveImageOp(fileObj: IUploadFile) {
    const f = await getFileFromBlobUrl(fileObj);

    const data = new FormData();
    data.append('image', f);

    return fetch(urls.IMAGE, {
        method: 'POST',
        body: data
    })
}

const saveImageEpic = (action$: ActionsObservable<AnyAction>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(saveImage)),
        flatMap(action => 
            new Observable(observer => {
                saveImageOp(action.payload)
                    .then(_ => observer.next(saveImageFinished()))
                    .then(() => observer.next(loadImages()))
            })            
        )
    )
}

export default combineEpics(loadListEpic, saveImageEpic)