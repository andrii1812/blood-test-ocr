import { ActionType, getType } from "typesafe-actions";
import * as stat from './actions';
import { ILoading, IGraphResponse, ILoadingState } from "../../model";

export type AddNewActions = ActionType<typeof stat>

const defaultState = {
    value: null,
    state: ILoadingState.INITIAL
}

export default (state: ILoading<IGraphResponse> = defaultState, action: AddNewActions): ILoading<IGraphResponse> => {
    switch(action.type) {
        case getType(stat.generateGraph):         
            return {...state, state: ILoadingState.LOADING}
        case getType(stat.generateGraphSuccess):
            const {request, response} = action.payload;
            for (var i = 0; i < request.lines.length; i++) {
                response.y[i].color = request.lines[i].color;
            }
            return {...state, state: ILoadingState.LOAD_SUCCESS, value: response}
        case getType(stat.generateGraphFailed): 
            return {...state, state: ILoadingState.LOAD_FAILURE}
        default:
            return state  
    }
}