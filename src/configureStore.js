import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import configureReducer from './configureReducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    configureReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}