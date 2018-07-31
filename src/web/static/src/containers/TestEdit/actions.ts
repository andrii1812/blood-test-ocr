import { createStandardAction } from "typesafe-actions";
import { IBloodTest } from "../../model";

export const loadTestStarted = createStandardAction('LOAD_TEST_STARTED')();
export const loadTest = createStandardAction('LOAD_TEST')<string>();
export const loadTestFailed = createStandardAction('LOAD_TEST_FAILED')();
export const testLoaded = createStandardAction('TEST_LOADED')<IBloodTest>();
export const clearTest = createStandardAction('CLEAR_TEST')();

export interface INameChangedPayload {
    name: string,
    newName: string
}
export const nameChanged = createStandardAction('NAME_CHANGED')<INameChangedPayload>();

export interface IValueChangedPayload {
    name: string,
    value: string
}
export const valueChanged = createStandardAction('VALUE_CHANGED')<IValueChangedPayload>();

export interface IDeletePayload {
    name: string
}
export const deleteEntry = createStandardAction('DELETE_ENTRY')<IDeletePayload>();

export const saveTest = createStandardAction('SAVE_TEST')();

export const tagChanged = createStandardAction('TAG_CHANGED')<string>();
