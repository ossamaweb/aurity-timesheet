// @flow
import type { Action, AppState } from '../types';
import {
  APP_BLOCK_UI,
  APP_ERROR
} from '../actions/app';

const initialState = {
  error: null,
  blockUI: false,
};

const app = (
  state: AppState = initialState,
  action: Action,
): AppState => {
  switch (action.type) {
    case APP_BLOCK_UI:
      return {
        ...state,
        blockUI: action.payload.blockUI,
      };
    case APP_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default app;
