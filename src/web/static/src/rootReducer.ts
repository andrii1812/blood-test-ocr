import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import appReducer from './containers/App/reducer';
import testEditReducer from './containers/TestEdit/reducer';
import { namespaced } from 'redux-subspace';
import addNewReducer from './containers/AddNew/reducer';
import testListReducer from './containers/TestList/reducer';
import uploadedImagesReducer from './containers/UploadedImages/reducer';
import statisticsReducer from './containers/Statistics/reducer';

export default combineReducers({
    router: routerReducer,
    app: appReducer,
    addNew: combineReducers({
        ingestFile: addNewReducer,
        editValues: namespaced('editValues')(testEditReducer)
    }),
    singleTest: namespaced('singleTest')(testEditReducer),
    testList: namespaced('testList')(testListReducer),
    uploadedImages: uploadedImagesReducer,
    parseExisting: namespaced('parseExisting')(testEditReducer),
    statistics: statisticsReducer,
});