import {combineReducers} from 'redux';
import appReducers from './app';
import userReducers from './user';

const rootReducer = combineReducers({
  app: appReducers,
  user: userReducers,
});

export default rootReducer;
