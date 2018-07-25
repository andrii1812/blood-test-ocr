import { IIngestFileState, getIngestFileState } from "../../model";
import * as addNew from "./actions";
import { getType, ActionType } from "typesafe-actions";

export type AddNewActions = ActionType<typeof addNew>

export default (state: IIngestFileState = getIngestFileState(), action: AddNewActions): IIngestFileState => {
    switch(action.type) {
        case getType(addNew.fileSelected):
            return {...state, file: action.payload}
        case getType(addNew.ingestStarted):
            return {...state, loading: true}
        case getType(addNew.ingestSucceed):
            return {...state, loading: false}        
        default:
            return state  
    }
}