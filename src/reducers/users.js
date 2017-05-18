import {
  GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL
} from '../actions/users';


const initialState = {
  data: [],
  currentUser: {},
  UIstate: { loading: false, loaded: false, error: null },
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        UIstate: {
          loading: true,
          loaded: false,
          error: null
        }
      })
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        UIstate: {
          loading: false,
          loaded: true,
          error: null
        },
        data: action.data,
        currentUser: action.data[1] // first as user as loggedIn user
      })
    case GET_USERS_FAIL:
      return Object.assign({}, state, {
        UIstate: {
          loading: false,
          loaded: false,
          error: action.error
        },
        data: []
      })
    default:
      return state
  }
}