import * as editValues from "./actions";
import { getType, ActionType } from "typesafe-actions";
import { IBloodTest, ITestEditState, TestEditLoading } from "../../model";

export type EditValuesActions = ActionType< typeof editValues>

const defaultState = {
    state: TestEditLoading.INITIAL,
    test: null
}

export default (state: ITestEditState = defaultState, action: EditValuesActions): ITestEditState => {
    switch(action.type) {
        case getType(editValues.loadTest):
        case getType(editValues.loadTestStarted):
            return {...state, state: TestEditLoading.LOADING}
        case getType(editValues.loadTestFailed):
            return {...state, state: TestEditLoading.LOAD_FAILURE}
        case getType(editValues.testLoaded):
            return {...state, test: action.payload, state: TestEditLoading.LOAD_SUCCESS}
        case getType(editValues.nameChanged):
            const {name, newName} = action.payload;
            return nameChanged(state, name, newName)
        case getType(editValues.valueChanged):
            return valueChanged(state, action.payload.name, action.payload.value)
        case getType(editValues.deleteEntry):
            return deleteEntry(state, action.payload.name)
        case getType(editValues.loadTest):
        case getType(editValues.clearTest):
            return {state: TestEditLoading.INITIAL, test: null};
        case getType(editValues.tagChanged):
            if(!state.test) {
                throw new Error('edit on null data');
            }
            return {...state, test: {...state.test, tag: action.payload}}
        default:
            return state  
    }
}

function nameChanged(state: ITestEditState, name: string, newName: string) {
    if(!state.test) {
        throw new Error('edit on null data');
    }

    let index = state.test.values.findIndex(x => x[0] === name);
    
    const newArray = state.test.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [newName, x[1]]
    })

    return {...state, values: newArray};
}

function valueChanged(state: ITestEditState, name: string, value:string) {
    if(!state.test) {
        throw new Error('edit on null data');
    }

    let index = state.test.values.findIndex(x => x[0] === name);
    
    const newArray = state.test.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [name, value]
    })

    return {...state, values: newArray};
}

function deleteEntry(state: ITestEditState, name: string) {
    if(!state.test) {
        throw new Error('edit on null data');
    }

    let index = state.test.values.findIndex(x => x[0] === name);
    const newArray = state.test.values;
    newArray.splice(index, 1);
    return {...state, values: newArray};
}