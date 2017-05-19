import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import {
  selectWeek,
  fetchWeeks,
  SELECT_WEEK,
  GET_WEEKS,
  GET_WEEKS_SUCCESS,
  GET_WEEKS_FAIL 
} from '../weeks';

const baseURL = 'https://timesheet-staging-aurity.herokuapp.com/api';
const mockStore = configureMockStore([thunk]);

describe('Actions: weeks', () => {
  // Normal Action
  it('should create an action to select a week', () => {
    const selectedWeek = { week_id: 1, week_number: 5 };
    const expectedAction = {
      type: SELECT_WEEK,
      payload: { selectedWeek }
    }
    expect(selectWeek(selectedWeek)).toEqual(expectedAction);
  })

  // Async Action
  beforeEach(() => {
    moxios.install();
  })

  afterEach(() => {
    moxios.uninstall();
  })
  
  it('should create GET_WEEKS_SUCCESS when fetching weeks has been done', () => {
    const monthNumber = 5;
    const year = 2017;
    const userId = 2;
    const data = {"data": {"data": {"data": {"data": {"data": {"data": {"month": 5, "owner_id": "2", "weeks": [], "year": 2016}}}}}}};
    moxios.stubRequest(`${baseURL}/training/weeks/${monthNumber}/${year}/${userId}`, {
      status: 200,
      response: data
    });
   
    const expectedActions = [
      { type: GET_WEEKS,
        payload: {
          monthNumber,
          year,
          userId
        }
      },
      { type: GET_WEEKS_SUCCESS,
        payload : { data }
      }
    ];

    const store = mockStore({ weeks: { data: [] } });

    return store.dispatch(fetchWeeks(monthNumber, year, userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create GET_WEEKS_FAIL when fetching weeks has failed', () => {
    const monthNumber = 5;
    const year = 2017;
    const userId = "userId";
    const error = new Error("Request failed with status code 400");
    moxios.stubRequest(`${baseURL}/training/weeks/${monthNumber}/${year}/${userId}`, {
      status: 400,
      response: error
    });
    
   
    const expectedActions = [
      { type: GET_WEEKS,
        payload: {
          monthNumber,
          year,
          userId
        }
      },
      { type: GET_WEEKS_FAIL,
        payload: { error }
      }
    ];

    const store = mockStore({ weeks: {
      data: [],
      UIstate: { loading: false, loaded: false, error: null },
    } });

    return store.dispatch(fetchWeeks(monthNumber, year, userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})