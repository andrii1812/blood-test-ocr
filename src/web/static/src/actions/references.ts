import {createStandardAction, } from 'typesafe-actions';
import urls from "../model/urls";

export const referenceNamesLoaded = createStandardAction('app/REFERENCE_NAMES_LOADED')<string[]>();

export function loadReferenceValues() {
    return function (dispatch: any) {
        return fetch(urls.REFERENCE_NAMES)
            .then(x => x.json())
            .then(x => dispatch(referenceNamesLoaded(x)));
    }
}
