import { getAllUsers } from '../api';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

function getUsers() {
  return {
    type: GET_USERS,
  }
}

function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data
  }
}

function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(getUsers())
    return getAllUsers()
      .then(response => dispatch(getUsersSuccess(response.data)))
      .catch(error => dispatch(getUsersFail(error)))
  }
}