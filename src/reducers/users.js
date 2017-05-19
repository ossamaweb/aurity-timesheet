// @flow
import type { Action, UsersState } from '../types';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL
} from '../actions/users';


const initialState = {
  data: [],
  currentUser: null,
  UIstate: { loading: false, loaded: false, error: null },
};

const users = (
  state: UsersState = initialState,
  action: Action,
): UsersState => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        UIstate: {
          loading: true,
          loaded: false,
          error: null
        }
      };
    case GET_USERS_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        data,
        currentUser: data && data.length > 1 ? data[1] : null, // second user as loggedIn user
        UIstate: {
          loading: false,
          loaded: true,
          error: null
        },
      };
    case GET_USERS_FAIL:
      const { error } = action.payload;
      return {
        ...state,
        UIstate: {
          loading: false,
          loaded: false,
          error: error
        },
        data: []
      };
    default:
      return state;
  }
}

export default users;
