import { createStandardAction } from "typesafe-actions";
import { IBloodTest } from "../../model";

export const testLoaded = createStandardAction('addNew/editValues/TEST_LOADED')<IBloodTest>();
export const clearTest = createStandardAction('addNew/editValues/CLEAR_TEST')();

export interface INameChangedPayload {
    name: string,
    newName: string
}
export const nameChanged = createStandardAction('addNew/editValues/NAME_CHANGED')<INameChangedPayload>();

export interface IValueChangedPayload {
    name: string,
    value: string
}
export const valueChanged = createStandardAction('addNew/editValues/VALUE_CHANGED')<IValueChangedPayload>();

export interface IDeletePayload {
    name: string
}
export const deleteEntry = createStandardAction('addNew/editValues/DELETE_ENTRY')<IDeletePayload>();