import { createStandardAction } from "typesafe-actions";
import { ITestListEntry } from "../../model/testList";

export const loadList = createStandardAction('LOAD_LIST')();
export const loadListFinished = createStandardAction('LOAD_LIST_FINISHED')<ITestListEntry[]>();

export const deleteTest = createStandardAction('DELETE_ENTRY')<ITestListEntry>();
export const deleteTestFinished = createStandardAction('DELETE_ENTRY_FINISHED')<ITestListEntry>();