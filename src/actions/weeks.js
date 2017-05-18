import { getMonthData, updateWeek } from '../api';

export const GET_WEEKS = 'GET_WEEKS';
export const GET_WEEKS_SUCCESS = 'GET_WEEKS_SUCCESS';
export const GET_WEEKS_FAIL = 'GET_WEEKS_FAIL';
export const SELECT_WEEK = 'SELECT_WEEK';
export const UPDATE_WEEK_STATUS = 'UPDATE_WEEK_STATUS';
export const UPDATE_WEEK_STATUS_SUCCESS = 'UPDATE_WEEK_STATUS_SUCCESS';
export const UPDATE_WEEK_STATUS_FAIL = 'UPDATE_WEEK_STATUS_FAIL';

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

export function selectWeek(selectedWeek) {
  return {
    type: SELECT_WEEK,
    selectedWeek
  }
}

function updateWeekStatus(weekId, approvedById, status) {
  return {
    type: UPDATE_WEEK_STATUS,
    blockUI: true,
  }
}

function updateWeekStatusSuccess(data) {
  return {
    type: UPDATE_WEEK_STATUS_SUCCESS,
    data,
    blockUI: false,
  }
}

function updateWeekStatusFail(error) {
  return {
    type: UPDATE_WEEK_STATUS_FAIL,
    error,
    blockUI: false,
  }
}

export function updateStatus(weekId, approvedById, status) {
  return dispatch => {
    dispatch(updateWeekStatus(weekId, approvedById, status))
    return updateWeek(weekId, approvedById, status)
      .then(response => dispatch(updateWeekStatusSuccess(response.data)))
      .catch(error => dispatch(updateWeekStatusFail(error)))
  }
}


