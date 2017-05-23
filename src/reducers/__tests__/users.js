import users from '../users';
import { GET_USERS, GET_USERS_SUCCESS } from '../../actions/users';

const initialState = {
  data: [],
  currentUser: null,
  UIstate: { loading: false, loaded: false, error: null },
};

describe('Reducer: users', () => {
  it('has a default state', () => {
    expect(users(undefined, { 
      type: 'unexpected'
    })).toEqual({
      ...initialState
    });
  });

  it('can handle GET_USERS', () => {
    expect(users(undefined, { 
      type: GET_USERS,
    })).toEqual(
      {
        ...initialState, 
        UIstate: {
          loading: true,
          loaded: false,
          error: null
        },
      }
    );
  });

  
  it('can handle GET_USERS_SUCCESS', () => {

    const data = [{"username":"User_1","id":1,"email":"user_1@aurity.co"},{"username":"User_2","id":2,"email":"user_2@aurity.co"},{"username":"User_3","id":3,"email":"user_3@aurity.co"},{"username":"User_4","id":4,"email":"user_4@aurity.co"},{"username":"User_5","id":5,"email":"user_5@aurity.co"},{"username":"User_6","id":6,"email":"user_6@aurity.co"},{"username":"User_7","id":7,"email":"user_7@aurity.co"},{"username":"User_8","id":8,"email":"user_8@aurity.co"},{"username":"User_9","id":9,"email":"user_9@aurity.co"},{"username":"User_10","id":10,"email":"user_10@aurity.co"},{"username":"l-nawrocki","id":28,"email":"lukasz.w.nawrocki@gmail.com"},{"username":"phuzarski","id":29,"email":"phuzarski@gmail.com"},{"username":"8Pablo","id":30,"email":"8Pablo@github.com"},{"username":"PeterKow","id":31,"email":"peter.kowalczyk@aurity.co"}];

    expect(users(undefined, { 
      type: GET_USERS_SUCCESS,
      payload: { data }
    })).toEqual(
      {...
        initialState,
        UIstate: {
          loading: false,
          loaded: true,
          error: null
        },
        data,
        currentUser: data[1]
      }
    );
  });
});