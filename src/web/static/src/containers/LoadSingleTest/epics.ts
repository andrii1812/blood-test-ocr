import { namespacedAction } from "redux-subspace";
import { testLoaded, loadTest, loadTestFailed } from "../TestEdit/actions";
import { ActionsObservable, ofType } from "redux-observable";
import { AnyAction, Store, MiddlewareAPI } from "redux";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import { switchMap } from "rxjs/operators";
import urls from "../../model/urls";

export const loadSingleTestEpic = (action$: ActionsObservable<AnyAction>, _: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(loadTest)),
        switchMap(x => 
            fetch(urls.testId(x.payload))
                .then(async x => {
                    if (!x.ok) {
                        return loadTestFailed()
                    }

                    return testLoaded(await x.json());
                })
        )
    )
}