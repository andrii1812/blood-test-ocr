import { namespacedAction } from "redux-subspace";
import { testLoaded } from "../TestEdit/actions";
import { ActionsObservable, ofType } from "redux-observable";
import { AnyAction, Store, MiddlewareAPI } from "redux";
import { Observable } from "rxjs";
import {loadTest} from './actions'
import { getType } from "typesafe-actions";
import { switchMap } from "rxjs/operators";

export const loadSingleTestEpic = (action$: ActionsObservable<AnyAction>, _: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(loadTest)),
        switchMap(x => 
            fetch('/test/' + x.payload)
                .then(x => x.json())
                .then(x => testLoaded(x))
        )
    )
}