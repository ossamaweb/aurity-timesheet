import { combineReducers } from 'redux';
import users from './reducers/users';
import weeks from './reducers/weeks'

const configureReducer = combineReducers({
  users,
  weeks
})

export default configureReducer;
