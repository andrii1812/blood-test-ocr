import { ActionsObservable, Epic, combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import { AppActions } from "./reducer";
import  * as references from "./actions";
import urls from "../../model/urls";
import {switchMap } from 'rxjs/operators'
import { Action, AnyAction } from "redux";
import { IAppState } from "../../model";

const referencesEpic = (action$: ActionsObservable<AnyAction>) : Observable<AnyAction> => {
    return action$
        .ofType(getType(references.loadReferenceValues))
        .pipe(
            switchMap(() =>
                fetch(urls.REFERENCE_NAMES)
                    .then(x => x.json())
                    .then(x => references.referenceNamesLoaded(x))));
}

const tagsEpic = (action$: ActionsObservable<AnyAction>) : Observable<AnyAction> => {
    return action$
        .ofType(getType(references.loadTags))
        .pipe(
            switchMap(() =>
                fetch(urls.LOAD_TAGS)
                    .then(x => x.json())
                    .then(x => references.loadTagsFinished(x))));
}

export const appValuesEpic = combineEpics(referencesEpic, tagsEpic)