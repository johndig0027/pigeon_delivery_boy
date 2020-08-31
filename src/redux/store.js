import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import monitorReducersEnhancer from './helper/monitorReducer';
import rootReducer from './reducer';

import {createLogger} from 'redux-logger';
const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
