import { ofType, ActionsObservable, combineEpics } from "redux-observable";
import { getType } from "typesafe-actions";
import { saveTest, dateChanged, patchIdChanged } from "./actions";
import { IBloodTest, getPatchId } from "../../model";
import { MiddlewareAPI, AnyAction } from "redux";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import { fromPromise } from "rxjs/observable/fromPromise";
import urls from "../../model/urls";
import { push } from "react-router-redux";

async function saveTestOp(ingestResults: IBloodTest) {
    let meta;

    if (ingestResults.patchId) {
        meta = {
            method: 'PATCH',
            url: urls.testId(ingestResults.patchId)
        }
    } else if (ingestResults.id) {
        meta = {
            method: 'PUT',
            url: urls.testId(ingestResults.id.toString())
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
    }).then(x => {
        if (!x.ok) {
            throw new Error('test is not saved');
        }
        
        return x;
    });

    if(ingestResults.id) {
        return '/test';
    } else if (ingestResults.patchId) {
        return '/test/' + ingestResults.patchId;
    } else {
        return '/test';    
    }
}


const saveTestEpic = (action$: ActionsObservable<AnyAction>, store: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(saveTest)),
        flatMap(() => fromPromise(saveTestOp(store.getState().value)
            .then((url: string) => push(url)))))
}

const dateChangedEpic = (action$: ActionsObservable<AnyAction>, store: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(dateChanged)),
        flatMap(() => fromPromise(getPatchId(store.getState().value.date)
            .then((res) => patchIdChanged(res)))))
}

export const testEditEpic = combineEpics(saveTestEpic, dateChangedEpic)