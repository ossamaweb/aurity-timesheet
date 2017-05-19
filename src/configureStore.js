// @flow
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import configureReducer from './configureReducer'

const loggerMiddleware = createLogger();

const configureStore = (preloadedState: any) => {
  return createStore(
    configureReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
export default configureStore;
