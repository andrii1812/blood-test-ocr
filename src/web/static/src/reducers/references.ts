import { ReferencesActions, references } from "../actions";
import { getType } from "typesafe-actions";

export default (state: string[] = [], action: ReferencesActions) => {
    switch(action.type) {
        case getType(references.referenceNamesLoaded):
            return [...state, ...action.payload]      
        default:
            return state  
    }
}