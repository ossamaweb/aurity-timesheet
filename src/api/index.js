import axios from 'axios';
axios.defaults.baseURL = 'https://timesheet-staging-aurity.herokuapp.com/api';

export function getAllUsers() {
  return axios.get('/users');
}

export function getMonthData(month_number, year, user_id) {
  return axios.get(`/training/weeks/${month_number}/${year}/${user_id}`);
}

export function updateWeek(weekId, approvedById, status) {
  return axios.put(
    `/training/weeks/${weekId}/users/${approvedById}`,
    { status }
  );
}
