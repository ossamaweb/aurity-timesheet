// @flow
import type { Action, Dispatch } from '../types';
import { getMonthData, updateWeek } from '../api';
import { appBlockUI } from './app';

export const GET_WEEKS = 'GET_WEEKS';
export const GET_WEEKS_SUCCESS = 'GET_WEEKS_SUCCESS';
export const GET_WEEKS_FAIL = 'GET_WEEKS_FAIL';
export const SELECT_WEEK = 'SELECT_WEEK';
export const UPDATE_WEEK_STATUS = 'UPDATE_WEEK_STATUS';
export const UPDATE_WEEK_STATUS_SUCCESS = 'UPDATE_WEEK_STATUS_SUCCESS';
export const UPDATE_WEEK_STATUS_FAIL = 'UPDATE_WEEK_STATUS_FAIL';

const getWeeks = (monthNumber: number, year: number, userId: ?number): Action => {
  return {
    type: GET_WEEKS,
    payload: { monthNumber, year, userId },
  }
}

const getWeeksSuccess = (data: Object): Action => {
  return {
    type: GET_WEEKS_SUCCESS,
    payload: { data },
  }
}

const getWeeksFail = (error: Error): Action => {
  return {
    type: GET_WEEKS_FAIL,
    payload: { error },
  }
}

export const fetchWeeks = (monthNumber: number, year: number, userId: ?number) => {
  return (dispatch: Dispatch) => {
    dispatch(getWeeks(monthNumber, year, userId))
    return getMonthData(monthNumber, year, userId)
      .then(response => dispatch(getWeeksSuccess(response.data)))
      .catch(error => dispatch(getWeeksFail(error)))
  }
}

export const selectWeek = (selectedWeek: Object): Action => {
  return {
    type: SELECT_WEEK,
    payload: { selectedWeek },
  }
}

const updateWeekStatus = (weekId: number, approvedById: number, status: string): Action => {
  return {
    type: UPDATE_WEEK_STATUS,
    payload: { blockUI: true },
  }
}

const updateWeekStatusSuccess = (data: Object): Action => {
  return {
    type: UPDATE_WEEK_STATUS_SUCCESS,
    payload: { data, blockUI: false },
  }
}

const updateWeekStatusFail = (error: Error): Action => {
  return {
    type: UPDATE_WEEK_STATUS_FAIL,
    payload: { error, blockUI: false },
  }
}

export const updateStatus = (weekId: number, approvedById: number, status: string) => {
  return (dispatch: Dispatch) => {
    dispatch(updateWeekStatus(weekId, approvedById, status))
    dispatch(appBlockUI(true))
    return updateWeek(weekId, approvedById, status)
      .then(response => dispatch(updateWeekStatusSuccess(response.data)))
      .catch(error => dispatch(updateWeekStatusFail(error)))
      .then(response => dispatch(appBlockUI(false)))
  }
}
