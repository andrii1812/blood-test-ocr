import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import appReducer from './containers/App/reducer';
import testEditReducer from './containers/TestEdit/reducer';
import { namespaced } from 'redux-subspace';
import addNewReducer from './containers/AddNew/reducer';
import testListReducer from './containers/TestList/reducer';

export default combineReducers({
    router: routerReducer,
    app: appReducer,
    addNew: combineReducers({
        ingestFile: addNewReducer,
        editValues: namespaced('editValues')(testEditReducer)
    }),
    singleTest: namespaced('singleTest')(testEditReducer),
    testList: namespaced('testList')(testListReducer)
});