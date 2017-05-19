// @flow
import type { Action, WeeksState } from '../types';
import {
  GET_WEEKS,
  GET_WEEKS_SUCCESS,
  GET_WEEKS_FAIL,
  SELECT_WEEK,
  UPDATE_WEEK_STATUS,
  UPDATE_WEEK_STATUS_SUCCESS,
  UPDATE_WEEK_STATUS_FAIL
} from '../actions/weeks';
import { propEq, update, findIndex, pick } from 'ramda';
import { generateCalendar } from '../utils/calendar.utils';

const findWeekIndex = (weekId: number, data: Array<Object>) => {
  return findIndex(propEq('week_id', weekId))(data);
}

const initialState = {
  data: [],
  selectedUser: null,
  selectedMonth: new Date().getMonth() + 1, // set current month as default, january is 0
  selectedYear: new Date().getFullYear(),
  selectedWeek: {},
  UIstate: { loading: false, loaded: false, error: null },
  updateUIstate: { updating: false, updated: false, error: null },
};

const weeks = (
  state: WeeksState = initialState,
  action: Action
): WeeksState => {
  switch (action.type) {
    case GET_WEEKS:
      const { userId, monthNumber, year } = action.payload;
      return {
        ...state,
        UIstate: {
          loading: true,
          loaded: false,
          error: null
        },
        selectedUser: userId,
        selectedMonth: monthNumber,
        selectedYear: year,
        selectedWeek: {},
      };
    case GET_WEEKS_SUCCESS:
      const { data: { data: { weeks } } } = action.payload;
      const { selectedMonth, selectedYear } = state;
      return {
        ...state,
        UIstate: {
          loading: false,
          loaded: true,
          error: null
        },
        data: generateCalendar(selectedMonth, selectedYear, weeks)
      };
    case GET_WEEKS_FAIL:
      const { error } = action.payload;
      return {
        ...state,
        UIstate: {
          loading: false,
          loaded: false,
          error
        },
        data: []
      };
    case SELECT_WEEK:
      const { selectedWeek } = action.payload;
      return {
        ...state,
        selectedWeek: selectedWeek,
      };
    case UPDATE_WEEK_STATUS:
      return {
        ...state,
        updateUIstate: {
          updating: true,
          updated: false,
          error: null
        }
      };
    case UPDATE_WEEK_STATUS_SUCCESS:
      const { data } = action.payload;
      const weekIndex = findWeekIndex(data.week_id, state.data);
      const updatedData = {
        ...state.data[weekIndex],
        ...pick(['status', 'approved_by_id', 'approved_by_date'], data)
      }
      return {
        ...state,
        updateUIstate: {
          updating: false,
          updated: true,
          error: null
        },
        data: update(weekIndex, updatedData, state.data),
        selectedWeek: updatedData,
      };
    case UPDATE_WEEK_STATUS_FAIL:
      return {
        ...state,
        updateUIstate: {
          updating: false,
          updated: false,
          error: action.payload.error
        }
      };
    default:
      return state;
  }
}

export default weeks;
