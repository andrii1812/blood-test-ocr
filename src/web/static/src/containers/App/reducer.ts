import  * as references from "./actions";
import { getType, ActionType } from "typesafe-actions";
import { AnyAction } from "redux";

export type AppActions = ActionType<typeof references>

export default (state: string[] = [], action: AppActions): string[] => {
    switch(action.type) {
        case getType(references.referenceNamesLoaded):
            return [...state, ...action.payload]      
        default:
            return state  
    }
}