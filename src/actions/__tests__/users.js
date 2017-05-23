import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import {
  fetchUsers,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL 
} from '../users';

const baseURL = 'https://timesheet-staging-aurity.herokuapp.com/api';
const mockStore = configureMockStore([thunk]);

describe('Actions: users', () => {

  // Async Action
  beforeEach(() => {
    moxios.install();
  })

  afterEach(() => {
    moxios.uninstall();
  })
  
  it('should create GET_USERS_SUCCESS when fetching users has been done', () => {
    const monthNumber = 5;
    const year = 2017;
    const userId = 2;
    const data = [{"username":"User_1","id":1,"email":"user_1@aurity.co"},{"username":"User_2","id":2,"email":"user_2@aurity.co"},{"username":"User_3","id":3,"email":"user_3@aurity.co"},{"username":"User_4","id":4,"email":"user_4@aurity.co"},{"username":"User_5","id":5,"email":"user_5@aurity.co"},{"username":"User_6","id":6,"email":"user_6@aurity.co"},{"username":"User_7","id":7,"email":"user_7@aurity.co"},{"username":"User_8","id":8,"email":"user_8@aurity.co"},{"username":"User_9","id":9,"email":"user_9@aurity.co"},{"username":"User_10","id":10,"email":"user_10@aurity.co"},{"username":"l-nawrocki","id":28,"email":"lukasz.w.nawrocki@gmail.com"},{"username":"phuzarski","id":29,"email":"phuzarski@gmail.com"},{"username":"8Pablo","id":30,"email":"8Pablo@github.com"},{"username":"PeterKow","id":31,"email":"peter.kowalczyk@aurity.co"}];
    moxios.stubRequest(`${baseURL}/users`, {
      status: 200,
      response: data
    });
   
    const expectedActions = [
      { type: GET_USERS },
      { type: GET_USERS_SUCCESS,
        payload : { data }
      }
    ];

    const store = mockStore({ users: { data: [] } });

    return store.dispatch(fetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})