import { ActionsObservable, Epic } from "redux-observable";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import { AppActions } from "./reducer";
import  * as references from "./actions";
import urls from "../../model/urls";
import {switchMap } from 'rxjs/operators'
import { Action, AnyAction } from "redux";
import { IAppState } from "../../model";

export const loadReferenceEpic = (action$: ActionsObservable<AnyAction>) : Observable<AnyAction> => {
    return action$
        .ofType(getType(references.loadReferenceValues))
        .pipe(
            switchMap(() =>
                fetch(urls.REFERENCE_NAMES)
                    .then(x => x.json())
                    .then(x => references.referenceNamesLoaded(x))));
}