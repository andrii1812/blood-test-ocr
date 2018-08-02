import { testLoaded, loadTest, loadTestFailed } from "../TestEdit/actions";
import { ActionsObservable, ofType } from "redux-observable";
import { AnyAction, MiddlewareAPI } from "redux";
import { Observable } from "rxjs";
import { getType } from "typesafe-actions";
import { switchMap } from "rxjs/operators";
import urls from "../../model/urls";
import { addPatchId } from "../../model";

export const parseExistingEpic = (action$: ActionsObservable<AnyAction>, _: MiddlewareAPI<any>) : Observable<AnyAction> => {
    return action$.pipe(
        ofType(getType(loadTest)),
        switchMap(x => 
            fetch(urls.parseExistingImage(x.payload))
                .then(async x => {
                    if (!x.ok) {
                        return loadTestFailed();
                    }

                    const json = await x.json();

                    if (!json) {         
                        return loadTestFailed();
                    }
                
                    await addPatchId(json);

                    return testLoaded(json);
                })
        )
    )
}
