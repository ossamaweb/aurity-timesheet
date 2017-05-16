import { combineReducers } from 'redux'
import users from './users'

const timesheetApp = combineReducers({
  users,
})

export default timesheetApp