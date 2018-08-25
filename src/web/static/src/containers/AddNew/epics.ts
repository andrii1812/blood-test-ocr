import { ActionsObservable, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import  * as addNew from "./actions";
import urls from "../../model/urls";
import { AnyAction } from "redux";
import { flatMap } from "rxjs/operators";
import { IAppState, getFileFromBlobUrl, getPatchId } from "../../model";
import { testLoaded, clearTest, loadTestFailed, loadTest, loadTestStarted } from "../TestEdit/actions";
import { namespacedAction } from "redux-subspace";
import { fromPromise } from "rxjs/observable/fromPromise";

const testLoadedNamespaced = (x: any): AnyAction => namespacedAction('editValues')(testLoaded(x))

export const addNewEpic = (action$: ActionsObservable<AnyAction>, store: any) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(addNew.ingestFile)),
        flatMap(() => new Observable<AnyAction>(observer => {
            observer.next(namespacedAction('editValues')(clearTest()));
            observer.next(namespacedAction('editValues')(loadTestStarted()));            
            fromPromise(ingestFile(
                store.getState(), 
                () => observer.next(namespacedAction('editValues')(loadTestFailed())))
                .then(x => {
                    if(!x) return;
                    observer.next(testLoadedNamespaced(x))
                }))
        }))
    )
}

async function ingestFile(state: IAppState, onError: () => void) {
    const fileObj = state.addNew.ingestFile.file;

    if (!fileObj) {
        return;
    }

    const f = await getFileFromBlobUrl(fileObj);

    const data = new FormData();
    data.append('image', f);


    let json = 
        await fetch(
            urls.INGEST_IMAGE, {
                method: 'POST',
                body: data
            }).then(x => {
                if (!x.ok) {
                    onError();
                    return;
                }
                return x.json()
            });

    if (!json) {         
        return;
    }

    json = {...json, ...(await getPatchId(json.date))};

    return json
}
