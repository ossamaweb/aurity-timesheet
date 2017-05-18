import { combineReducers } from 'redux';
import app from './reducers/app';
import users from './reducers/users';
import weeks from './reducers/weeks'

const configureReducer = combineReducers({
  app,
  users,
  weeks
})

export default configureReducer;
