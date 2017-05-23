// @flow

export type Dispatch = (action: Action | Promise<Action>) => Promise<any>;

// Models

export type User = {|
  username: string,
  id: number,
  email: string,
|};

export type UIstate = {|
  loading: boolean,
  loaded: boolean,
  error: ?Error,
|};

export type updateUIstate = {|
  updating: boolean,
  updated: boolean,
  error: ?Error,
|};


// Reducers

export type AppState = {
  error: ?Error,
  blockUI: boolean,
};

export type UsersState = {
  data: Array<User>,
  currentUser: ?User,
  UIstate: UIstate,
};

export type WeeksState = {
  data: Array<Object>,
  selectedUser: ?number,
  selectedMonth: number,
  selectedYear: number,
  selectedWeek: Object,
  UIstate: UIstate,
  updateUIstate: updateUIstate,
};

// State

export type State = {
  app: AppState,
  users: UsersState,
  weeks: WeeksState,
};

// Actions

export type Action =
    { type: 'GET_USERS' }
  | { type: 'GET_USERS_SUCCESS', payload: { data: Array<User> } }
  | { type: 'GET_USERS_FAIL', payload: { error: Error } }
  | { type: 'GET_WEEKS', payload: { monthNumber: number, year: number, userId: ?number } }
  | { type: 'GET_WEEKS_SUCCESS', payload: { data: Object } }
  | { type: 'GET_WEEKS_FAIL', payload: { error: Error } }
  | { type: 'SELECT_WEEK', payload: { selectedWeek: Object } }
  | { type: 'UPDATE_WEEK_STATUS', payload: { blockUI: boolean } }
  | { type: 'UPDATE_WEEK_STATUS_SUCCESS', payload: { data: Object, blockUI: boolean } }
  | { type: 'UPDATE_WEEK_STATUS_FAIL', payload: { error: Error, blockUI: boolean } }
  | { type: 'APP_BLOCK_UI', payload: { blockUI: boolean } }
  | { type: 'APP_ERROR', payload: { error: Error } };
