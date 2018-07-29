import  * as references from "./actions";
import { getType, ActionType } from "typesafe-actions";
import { AnyAction } from "redux";
import { IAppValuesState } from "../../model";

export type AppActions = ActionType<typeof references>

const initState = {
    references: [],
    tags: []
}

export default (state: IAppValuesState = initState, action: AppActions): IAppValuesState => {
    switch(action.type) {
        case getType(references.referenceNamesLoaded):
            return {...state, references: action.payload}
        case getType(references.loadTagsFinished):
            return {...state, tags: action.payload}
        default:
            return state  
    }
}