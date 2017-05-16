import axios from 'axios';
axios.defaults.baseURL = 'https://timesheet-staging-aurity.herokuapp.com/api';

export function getUsers() {
  return axios.get('/users');
}