import { createStandardAction } from "typesafe-actions";
import urls from "../../model/urls";
import { IUploadFile, IAppState } from "../../model";
import { push } from "react-router-redux";
import { testLoaded } from "./editValues";


export const fileSelected = createStandardAction('addNew/ingestFile/FILE_SELECTED')<IUploadFile>();
export const ingestStarted = createStandardAction('addNew/ingestFile/INGEST_STARTED')();
export const ingestSucceed = createStandardAction('addNew/ingestFile/INGEST_SUCCEED')();

export function ingestFile() {
    return async function (dispatch: any, getState: () => IAppState) {
        dispatch(ingestStarted());
        const state = getState();
        const fileObj = state.addNew.ingestFile.file;

        if (!fileObj) {
            return;
        }

        const res = await fetch(fileObj.url);
        const file = await res.blob();

        const f = new File([file], fileObj.filename);

        if (!file) {
            return;
        }

        const data = new FormData();
        data.append('image', f);

        const response = await fetch(urls.INGEST_IMAGE, {
            method: 'POST',
            body: data
        })
        const json = await response.json();
        dispatch(ingestSucceed());   
        dispatch(testLoaded(json));   
    }
}

export function saveTest() {
    return async (dispatch: any, getState: () => IAppState) => {  
        const state = getState();
        const ingestResults = state.addNew.editValues;

        const response = await fetch(urls.TEST, {
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingestResults)
        })
        const id = await response.text();
        dispatch(push('/test/' + id));       
    }
}