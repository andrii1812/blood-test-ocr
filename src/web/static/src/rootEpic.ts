import { combineEpics } from 'redux-observable'
import { appValuesEpic } from './containers/App/epics';
import { addNewEpic } from './containers/AddNew/epics';
import { subspaced } from 'redux-subspace-observable';
import { loadSingleTestEpic } from './containers/LoadSingleTest/epics';
import { IAppState } from './model';
import { testEditEpic } from './containers/TestEdit/epics';
import { testListEpic } from './containers/TestList/epics';
import uploadedImagesEpic from './containers/UploadedImages/epics';
import { parseExistingEpic } from './containers/ParseExisting/epics';

export default combineEpics(
    appValuesEpic,
    addNewEpic,
    subspaced((state:any) => state.singleTest, 'singleTest')(loadSingleTestEpic),
    subspaced((state:any) => state.addNew.editValues, 'editValues')(testEditEpic),
    subspaced((state:any) => state.singleTest, 'singleTest')(testEditEpic),
    subspaced((state:any) => state.testList, 'testList')(testListEpic),
    uploadedImagesEpic,
    subspaced((state:any) => state.parseExisting, 'parseExisting')(combineEpics(
        parseExistingEpic,
        testEditEpic
    )),   
)