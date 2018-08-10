import { ActionsObservable, ofType } from "redux-observable";
import { AnyAction, MiddlewareAPI } from "redux";
import { Observable } from "rxjs";
import { generateGraph, generateGraphFailed, generateGraphSuccess } from "./actions";
import { getType } from "typesafe-actions";
import { switchMap } from "rxjs/operators";
import urls from "../../model/urls";



export const generateGraphEpic = (action$: ActionsObservable<AnyAction>, _: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(generateGraph)),
        switchMap(action => 
            fetch(urls.STATISTICS, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(action.payload)
                    })
                .then(async x => {
                    if (!x.ok) {
                        return generateGraphFailed();
                    }

                    const json = await x.json();

                    if (!json) {         
                        return generateGraphFailed();
                    }               
                    const payload = {
                        request: action.payload,
                        response: json
                    }
                    return generateGraphSuccess(payload);
                })
        )
    )
}