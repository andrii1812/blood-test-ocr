import { EditValuesActions } from "./reducer";
import { ofType, ActionsObservable } from "redux-observable";
import { getType } from "typesafe-actions";
import { saveTest, clearTest } from "./actions";
import { IAppState, IBloodTest } from "../../model";
import { Store, MiddlewareAPI, AnyAction } from "redux";
import { Observable } from "rxjs";
import { flatMap, concat } from "rxjs/operators";
import { fromPromise } from "rxjs/observable/fromPromise";
import urls from "../../model/urls";
import { push, RouterAction } from "react-router-redux";
import { of } from "rxjs/observable/of";

async function saveTestOp(ingestResults: IBloodTest) {
    let meta;

    if (ingestResults.id) {
        meta = {
            method: 'PUT',
            url: urls.testId(ingestResults.id)
        }
    } else {
        meta = {
            method: 'POST',
            url: urls.TEST
        }
    }

    const response = await fetch(meta.url, {
        method: meta.method,        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingestResults)
    })
    return await response.text();    
}

type A = EditValuesActions | RouterAction

export const testEditEpic = (action$: ActionsObservable<AnyAction>, store: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(saveTest)),
        flatMap(x => 
            fromPromise(saveTestOp(store.getState())
                .then((id: string) => push('/test/' + parseInt(id))))))
}