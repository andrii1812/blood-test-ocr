import { ActionsObservable, ofType, combineEpics } from "redux-observable";
import { AnyAction, MiddlewareAPI } from "redux";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import { loadList, loadListFinished, deleteTest, deleteTestFinished } from "./actions";
import { flatMap } from "rxjs/operators";
import urls from "../../model/urls";

const loadListEpic = (action$: ActionsObservable<AnyAction>, store: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(loadList)),
        flatMap(_ => 
            fetch(urls.TEST)
                .then(x => x.json())
                .then(x => loadListFinished(x))
        )
    )
}

const deleteTestEpic = (action$: ActionsObservable<AnyAction>, store: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(deleteTest)),
        flatMap(action => 
            new Observable((observer) => {
                fetch(urls.testId(action.payload.id), {method: 'DELETE'})
                    .then(res => {
                        if(res.status !== 204) {
                            console.error(res.statusText);
                            return;
                        } 
                        observer.next(deleteTestFinished(action.payload))
                    })
            })            
        )
    )
}

export const testListEpic = combineEpics(loadListEpic, deleteTestEpic)
