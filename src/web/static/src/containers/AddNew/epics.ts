import { ActionsObservable, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import  * as addNew from "./actions";
import urls from "../../model/urls";
import { AnyAction } from "redux";
import { flatMap } from "rxjs/operators";
import { IAppState, getFileFromBlobUrl } from "../../model";
import { testLoaded, clearTest } from "../TestEdit/actions";
import { namespacedAction } from "redux-subspace";
import { fromPromise } from "rxjs/observable/fromPromise";

const testLoadedNamespaced = (x: any): AnyAction => namespacedAction('editValues')(testLoaded(x))

export const addNewEpic = (action$: ActionsObservable<AnyAction>, store: any) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(addNew.ingestFile)),
        flatMap(() => new Observable<AnyAction>(observer => {
            observer.next(addNew.ingestStarted());
            observer.next(namespacedAction('editValues')(clearTest()));
            fromPromise(ingestFile(store.getState())
                .then(x => observer.next(testLoadedNamespaced(x)))
                .then(() => observer.next(addNew.ingestSucceed())));
        }))
    )
}

async function ingestFile(state: IAppState) {
    const fileObj = state.addNew.ingestFile.file;

    if (!fileObj) {
        return;
    }

    const f = await getFileFromBlobUrl(fileObj);

    const data = new FormData();
    data.append('image', f);

    const json = await fetch(urls.INGEST_IMAGE, {
                            method: 'POST',
                            body: data
                        }).then(x => x.json());

    const id = await fetch(urls.findTestId(json.date))
                                .then(x => x.text());

    if (id) {
        json.patchId = id;
    }

    return json
}