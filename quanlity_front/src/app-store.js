import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';

import { listReducer } from './redux/reducers/listReducer';
import { exportReducer } from './redux/reducers/exportReducer';
import { wardReducer } from './redux/reducers/wardReducer';
import { authReducer } from './redux/reducers/authReducer';
import { configReducer } from './redux/reducers/configReducer';

const appReducer = combineReducers({
    //For Authentication
    auth: authReducer,
    //For Request Manager
    listData: listReducer,
    //For Request Manager
    excelData: exportReducer,
    //For Request Manager
    wardData: wardReducer,
    //For Request Manager
    configData: configReducer,
});
const appStore = createStore(appReducer, applyMiddleware(thunk));
export default appStore;
