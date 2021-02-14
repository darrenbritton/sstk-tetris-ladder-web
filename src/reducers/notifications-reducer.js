import { NOTIFY_GENERIC, NOTIFY_CLEAR } from '../actions';

export default function (state = { generic: [] }, action) {
  switch (action.type) {
    case NOTIFY_GENERIC:
      return {
        ...state,
        generic: [...state.generic, action.payload],
      };
    case NOTIFY_CLEAR:
      return {
        ...state,
        generic: [],
      };
    default:
      return state;
  }
}
