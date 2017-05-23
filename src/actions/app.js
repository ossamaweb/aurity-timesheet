// @flow
import type { Action } from '../types';

export const APP_BLOCK_UI = 'APP_BLOCK_UI';
export const APP_ERROR = 'APP_ERROR';

export const appBlockUI = (blockUI: boolean): Action => {
  return {
    type: APP_BLOCK_UI,
    payload: { blockUI }
  }
}

export const appError = (error: Error): Action => {
  return {
    type: APP_ERROR,
    payload: { error }
  }
}
