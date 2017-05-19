// @flow
import { combineReducers } from 'redux';
import app from './reducers/app';
import users from './reducers/users';
import weeks from './reducers/weeks'

const configureReducer = combineReducers({
  app,
  weeks,
  users
})

export default configureReducer;
