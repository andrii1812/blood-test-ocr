import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';
import referencesReducer from './references';
import ingestFileReducer from './addNew/ingestFile';
import editValuesReducer from './addNew/editValues';

export default combineReducers({
    router: routerReducer,
    references: referencesReducer,
    addNew: combineReducers({
        ingestFile: ingestFileReducer,
        editValues: editValuesReducer
    })
});