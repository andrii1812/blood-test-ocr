import { ActionsObservable, ofType, Epic } from "redux-observable";
import { Observer, Observable } from "rxjs";
import { getType, ActionType } from "typesafe-actions";
import { AddNewActions } from "./reducer";
import  * as addNew from "./actions";
import urls from "../../model/urls";
import { Store, Action, AnyAction } from "redux";
import { flatMap } from "rxjs/operators";
import { IAppState, IBloodTest } from "../../model";
import { testLoaded } from "../TestEdit/actions";
import { namespacedAction } from "redux-subspace";
import { fromPromise } from "rxjs/observable/fromPromise";
import { PayloadAction } from "typesafe-actions/dist/types";

type A =  AddNewActions | PayloadAction<'TEST_LOADED', IBloodTest>

const testLoadedNamespaced = (x: any): A => namespacedAction('editValues')(testLoaded(x))

export const addNewEpic = (action$: ActionsObservable<AnyAction>, store: any) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(addNew.ingestFile)),
        flatMap(x => 
            new Observable<A>(observer => {
                observer.next(addNew.ingestStarted())
                fromPromise(ingestFile(store.getState())
                    .then(x => observer.next(testLoadedNamespaced(x)))
                    .then(() => observer.next(addNew.ingestSucceed())))                
            }))
    )
}

async function ingestFile(state: IAppState) {
    const fileObj = state.addNew.ingestFile.file;

    if (!fileObj) {
        return;
    }

    const res = await fetch(fileObj.url);
    const file = await res.blob();

    const f = new File([file], fileObj.filename);

    if (!file) {
        return;
    }

    const data = new FormData();
    data.append('image', f);

    const response = await fetch(urls.INGEST_IMAGE, {
        method: 'POST',
        body: data
    })
    const json = await response.json();
    return json
}