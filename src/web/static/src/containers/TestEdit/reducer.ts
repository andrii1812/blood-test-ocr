import * as editValues from "./actions";
import { getType, ActionType } from "typesafe-actions";
import { IBloodTest } from "../../model";

export type EditValuesActions = ActionType< typeof editValues>
type NullableBloodTest = IBloodTest | null;

export default (state: NullableBloodTest = null, action: EditValuesActions): NullableBloodTest => {
    switch(action.type) {
        case getType(editValues.testLoaded):
            return {...action.payload}
        case getType(editValues.nameChanged):
            const {name, newName} = action.payload;
            return nameChanged(state, name, newName)
        case getType(editValues.valueChanged):
            return valueChanged(state, action.payload.name, action.payload.value)
        case getType(editValues.deleteEntry):
            return deleteEntry(state, action.payload.name)
        case getType(editValues.clearTest):
            return null;
        default:
            return state  
    }
}

function nameChanged(state: NullableBloodTest, name: string, newName: string): NullableBloodTest{
    if(!state) {
        throw new Error('edit on null data');
    }

    let index = state.values.findIndex(x => x[0] === name);
    
    const newArray = state.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [newName, x[1]]
    })

    return {...state, values: newArray};
}

function valueChanged(state: NullableBloodTest, name: string, value:string) {
    if(!state) {
        throw new Error('edit on null data');
    }

    let index = state.values.findIndex(x => x[0] === name);
    
    const newArray = state.values.map((x, i) => {
        if(index != i) {
            return x;
        }

        return [name, value]
    })

    return {...state, values: newArray};
}

function deleteEntry(state: NullableBloodTest, name: string) {
    if(!state) {
        throw new Error('edit on null data');
    }

    let index = state.values.findIndex(x => x[0] === name);
    const newArray = state.values;
    newArray.splice(index, 1);
    return {...state, values: newArray};
}