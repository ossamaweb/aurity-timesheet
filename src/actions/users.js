import { getUsers } from '../api';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

function requestUsers() {
  return {
    type: REQUEST_USERS,
  }
}

function receiveUsers(data) {
  return {
    type: RECEIVE_USERS,
    data
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return getUsers()
      .then(response => dispatch(receiveUsers(response.data)))
      .catch(error => console.log(error))
  }
}