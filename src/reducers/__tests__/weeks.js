import weeks from '../weeks';
import { GET_WEEKS } from '../../actions/weeks';

const initialState = {
  data: [],
  selectedUser: null,
  selectedMonth: new Date().getMonth() + 1, // set current month as default, january is 0
  selectedYear: new Date().getFullYear(),
  selectedWeek: {},
  UIstate: { loading: false, loaded: false, error: null },
  updateUIstate: { updating: false, updated: false, error: null },
};

describe('Reducer: weeks', () => {
  it('has a default state', () => {
    expect(weeks(undefined, { 
      type: 'unexpected'
    })).toEqual({
      ...initialState
    });
  });

  it('can handle GET_WEEKS', () => {
    expect(weeks(undefined, { 
      type: GET_WEEKS,
      payload: {
        userId: 1,
        monthNumber: 5,
        year: 2017,
      }
    })).toEqual(
      Object.assign({}, initialState, {
        UIstate: {
          loading: true,
          loaded: false,
          error: null
        },
        selectedUser: 1,
        selectedMonth: 5,
        selectedYear: 2017,
      })
    );
  });
});