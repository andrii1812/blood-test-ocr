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
            const {index, newName} = action.payload;
            return nameChanged(state, index, newName)
        case getType(editValues.valueChanged):
            return valueChanged(state, action.payload.index, action.payload.value)
        case getType(editValues.deleteEntry):
            return deleteEntry(state, action.payload.index)
        case getType(editValues.loadTest):
        case getType(editValues.clearTest):
            return {state: TestEditLoading.INITIAL, test: null};
        case getType(editValues.tagChanged):
            if(!state.test) {
                throw new Error('edit on null data');
            }
            return {...state, test: {...state.test, tag: action.payload}}
        case getType(editValues.addNewEntry):
            if(!state.test) {
                throw new Error('edit on null data');
            }
            const arr = [...state.test.values, [action.payload.name, action.payload.value]]
            return {...state, test: {...state.test, values: arr}}
        default:
            return state  
    }
}

function nameChanged(state: ITestEditState, index: number, newName: string) {
    if(!state.test) {
        throw new Error('edit on null data');
    }

    const newArray = state.test.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [newName, x[1]]
    })

    return {...state, test: {...state.test, values: newArray}};
}

function valueChanged(state: ITestEditState, index: number, value:string) {
    if(!state.test) {
        throw new Error('edit on null data');
    }

    const newArray = state.test.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [x[0], value]
    })

    return {...state, test: {...state.test, values: newArray}};
}

function deleteEntry(state: ITestEditState, index: number) {
    if(!state.test) {
        throw new Error('edit on null data');
    }

    const newArray = state.test.values;
    newArray.splice(index, 1);
    return {...state, test: {...state.test, values: newArray}};
}