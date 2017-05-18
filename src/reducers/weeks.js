import {
  GET_WEEKS,
  GET_WEEKS_SUCCESS,
  GET_WEEKS_FAIL,
  SELECT_WEEK,
  UPDATE_WEEK_STATUS,
  UPDATE_WEEK_STATUS_SUCCESS,
  UPDATE_WEEK_STATUS_FAIL
} from '../actions/weeks';
import { sortWith, prop, ascend, propEq, update, findIndex } from 'ramda';

const weekNumberSort = sortWith([
  ascend(prop('week_number'))
]);

const initialState = {
  data: [],
  selectedUser: null,
  selectedMonth: new Date().getMonth() + 1, // set current month as default, january is 0
  selectedYear: new Date().getFullYear(),
  selectedWeek: {},
  UIstate: { loading: false, loaded: false, error: null },
  updateUIstate: { updating: false, updated: false, error: null },
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
        selectedYear: action.year,
        selectedWeek: {},
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
    case SELECT_WEEK:
      return Object.assign({}, state, {
        selectedWeek: action.selectedWeek,
      })
    case UPDATE_WEEK_STATUS:
      return Object.assign({}, state, {
        updateUIstate: {
          updating: true,
          updated: false,
          error: null
        }
      })
    case UPDATE_WEEK_STATUS_SUCCESS:
      const updatedWeekIndex = findIndex(propEq('week_id', action.data.week_id))(state.data);
      return Object.assign({}, state, {
        updateUIstate: {
          updating: false,
          updated: true,
          error: null
        },
        data: update(updatedWeekIndex, action.data, state.data),
        selectedWeek: action.data,
      })
    case UPDATE_WEEK_STATUS_FAIL:
      return Object.assign({}, state, {
        updateUIstate: {
          updating: false,
          updated: false,
          error: action.error
        }
      })
    default:
      return state
  }
}