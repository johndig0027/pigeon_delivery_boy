import {combineReducers} from 'redux';
import appReducers from './app';
import userReducers from './user';
import orderReducers from './order';

const rootReducer = combineReducers({
  app: appReducers,
  user: userReducers,
  order: orderReducers,
});

export default rootReducer;
