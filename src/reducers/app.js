// @flow
const initialState = {
  error: null,
  blockUI: false,
};

export default function app(state = initialState, action) {
  if (action.type.endsWith('_FAIL')) {
    alert(action.error || action.error.message);
    // To do: build an alert component
    state = { ...state, error: action.error };
  }
  if ('blockUI' in action) {
    state = { ...state, blockUI: action.blockUI };
  }
  return state;
}