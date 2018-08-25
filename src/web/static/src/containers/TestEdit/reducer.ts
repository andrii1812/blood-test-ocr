import * as editValues from "./actions";
import { getType, ActionType } from "typesafe-actions";
import { IBloodTest, ILoading, ILoadingState } from "../../model";

export type EditValuesActions = ActionType< typeof editValues>

const defaultState = {
    state: ILoadingState.INITIAL,
    value: null
}

export default (state: ILoading<IBloodTest> = defaultState, action: EditValuesActions): ILoading<IBloodTest> => {    
    switch(action.type) {
        case getType(editValues.loadTest):
        case getType(editValues.loadTestStarted):
            return {...state, state: ILoadingState.LOADING}
        case getType(editValues.loadTestFailed):
            return {...state, state: ILoadingState.LOAD_FAILURE}
        case getType(editValues.testLoaded):
            return {...state, value: action.payload, state: ILoadingState.LOAD_SUCCESS}
        case getType(editValues.nameChanged):
            const {index, newName} = action.payload;
            return nameChanged(state, index, newName)
        case getType(editValues.valueChanged):
            return valueChanged(state, action.payload.index, action.payload.value)
        case getType(editValues.deleteEntry):
            return deleteEntry(state, action.payload.index)
        case getType(editValues.loadTest):
        case getType(editValues.clearTest):
            return {state: ILoadingState.INITIAL, value: null};
        case getType(editValues.tagChanged):
            if(!state.value) {
                throw new Error('edit on null data');
            }
            return {...state, value: {...state.value, tag: action.payload}}
        case getType(editValues.dateChanged):
            if(!state.value) {
                throw new Error('edit on null data');
            }
            return {...state, value: {...state.value, date: action.payload}}
        case getType(editValues.patchIdChanged):
            if(!state.value) {
                throw new Error('edit on null data');
            }
            return {...state, value: {...state.value, ...action.payload}}
        case getType(editValues.addNewEntry):
            if(!state.value) {
                throw new Error('edit on null data');
            }
            const arr = [...state.value.values, [action.payload.name, action.payload.value]]
            return {...state, value: {...state.value, values: arr}}
        default:
            return state  
    }
}

function nameChanged(state: ILoading<IBloodTest>, index: number, newName: string) {
    if(!state.value) {
        throw new Error('edit on null data');
    }

    const newArray = state.value.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [newName, x[1]]
    })

    return {...state, value: {...state.value, values: newArray}};
}

function valueChanged(state: ILoading<IBloodTest>, index: number, value:string) {
    if(!state.value) {
        throw new Error('edit on null data');
    }

    const newArray = state.value.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [x[0], value]
    })

    return {...state, value: {...state.value, values: newArray}};
}

function deleteEntry(state: ILoading<IBloodTest>, index: number) {
    if(!state.value) {
        throw new Error('edit on null data');
    }

    const newArray = state.value.values;
    newArray.splice(index, 1);
    return {...state, value: {...state.value, values: newArray}};
}