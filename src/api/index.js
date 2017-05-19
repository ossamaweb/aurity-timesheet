// @flow
import axios from 'axios';
axios.defaults.baseURL = 'https://timesheet-staging-aurity.herokuapp.com/api';

export const getAllUsers = () => {
  return axios.get('/users');
}

export const getMonthData = (monthNumber: number, year: number, userId: ?number) => {
  return axios.get(`/training/weeks/${monthNumber}/${year}/${userId ? userId : ''}`);
}

export const updateWeek = (weekId: number, approvedById: number, status: string) => {
  return axios.put(
    `/training/weeks/${weekId}/users/${approvedById}`,
    { status }
  );
}
