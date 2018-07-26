import { ITestList } from "../../model/testList";
import { ActionType, getType } from "typesafe-actions";
import * as testList from './actions';

const initState = {
    list: [],
    loading: false
}

export type TestListActions = ActionType<typeof testList>

export default (state: ITestList = initState, action: TestListActions): ITestList => {
    switch(action.type) {
        case getType(testList.loadList):
            return {...state, loading: true}
        case getType(testList.loadListFinished):
            return {...state, loading: false, list: action.payload}
        case getType(testList.deleteTestFinished):
            const index = state.list.indexOf(action.payload)
            const list = [
                ...state.list.slice(0, index),
                ...state.list.slice(index + 1)
            ];
            return {...state, list}
        default:
            return state  
    }
}