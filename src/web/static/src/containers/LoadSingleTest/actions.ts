import { createStandardAction } from "typesafe-actions";

export const loadTest = createStandardAction('LOAD_TEST')<string>();