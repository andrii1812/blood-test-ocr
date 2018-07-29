import {createStandardAction } from 'typesafe-actions';

export const referenceNamesLoaded = createStandardAction('REFERENCE_NAMES_LOADED')<string[]>();
export const loadReferenceValues = createStandardAction('LOAD_REFERENCE_VALUES')();

export const loadTags = createStandardAction('LOAD_TAGS')();
export const loadTagsFinished = createStandardAction('LOAD_TAGS_FINISHED')<string[]>();


