import { getMonthData } from '../api';

export const GET_WEEKS = 'GET_WEEKS';
export const GET_WEEKS_SUCCESS = 'GET_WEEKS_SUCCESS';
export const GET_WEEKS_FAIL = 'GET_WEEKS_FAIL';

function getWeeks(monthNumber, year, userId) {
  return {
    type: GET_WEEKS,
    monthNumber,
    year,
    userId
  }
}

function getWeeksSuccess(data) {
  return {
    type: GET_WEEKS_SUCCESS,
    data
  }
}

function getWeeksFail(error) {
  return {
    type: GET_WEEKS_FAIL,
    error
  }
}

export function fetchWeeks(monthNumber, year, userId) {
  return dispatch => {
    dispatch(getWeeks(monthNumber, year, userId))
    return getMonthData(monthNumber, year, userId)
      .then(response => dispatch(getWeeksSuccess(response.data)))
      .catch(error => dispatch(getWeeksFail(error)))
  }
}