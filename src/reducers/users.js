import {
  REQUEST_USERS, RECEIVE_USERS
} from '../actions/users';


const initialState = {
  data: [],
  UIstate: { loading: false, loaded: false, error: null },
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        UIstate: {
          loading: true
        }
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        UIstate: {
          loading: false,
          loaded: true
        },
        data: action.data
      })
    default:
      return state
  }
}