import * as references from './references';
import { ActionType } from 'typesafe-actions';
import * as addNew from './addNew/ingestFile'
import * as editValues from './addNew/editValues'

export type ReferencesActions = ActionType<typeof references>;
export {references}

export type AddNewActions = ActionType<typeof addNew>;
export {addNew}

export type EditValuesActions = ActionType<typeof editValues>;
export {editValues}