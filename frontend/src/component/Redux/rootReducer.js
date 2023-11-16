import { combineReducers } from 'redux';
import { mongodbReducer,authReducer,googleReducer } from './reducer';

const rootReducer = combineReducers({
mongodb: mongodbReducer,
auth: authReducer,
google:googleReducer,

});

export default rootReducer;