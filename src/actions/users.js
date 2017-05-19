// @flow
import { getAllUsers } from '../api';
import type { Action, Dispatch, User } from '../types';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

const getUsers = (): Action =>{
  return {
    type: GET_USERS,
  }
}

const getUsersSuccess = (data: Array<User>): Action => {
  return {
    type: GET_USERS_SUCCESS,
    payload: { data },
  }
}

const getUsersFail = (error: Error): Action => {
  return {
    type: GET_USERS_FAIL,
    payload: { error },
  }
}

export const fetchUsers = () => {
  return (dispatch: Dispatch) => {
    dispatch(getUsers())
    return getAllUsers()
      .then(response => dispatch(getUsersSuccess(response.data)))
      .catch(error => dispatch(getUsersFail(error)))
  }
}
