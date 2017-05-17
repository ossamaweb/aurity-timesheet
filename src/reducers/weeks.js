import {
  GET_WEEKS, GET_WEEKS_SUCCESS, GET_WEEKS_FAIL
} from '../actions/weeks';
import { sortWith, prop, ascend } from 'ramda';

const weekNumberSort = sortWith([
  ascend(prop('week_number'))
]);

const initialState = {
  data: [],
  selectedUser: null,
  selectedMonth: new Date().getMonth() + 1, // set current month as default, january is 0
  selectedYear: new Date().getFullYear(),
  UIstate: { loading: false, loaded: false, error: null },
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_WEEKS:
      return Object.assign({}, state, {
        UIstate: {
          loading: true,
          loaded: false,
          error: null
        },
        selectedUser: action.userId,
        selectedMonth: action.monthNumber,
        selectedYear: action.year
      })
    case GET_WEEKS_SUCCESS:
      return Object.assign({}, state, {
        UIstate: {
          loading: false,
          loaded: true,
          error: null
        },
        data: weekNumberSort(action.data.data.weeks)
      })
    case GET_WEEKS_FAIL:
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