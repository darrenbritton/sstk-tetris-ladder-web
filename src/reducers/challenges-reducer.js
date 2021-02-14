import { PERSIST_CHALLENGES } from '../actions';

export default function (state = { received: [], sent: [] }, action) {
  switch (action.type) {
    case PERSIST_CHALLENGES:
      return action.payload;
    default:
      return state;
  }
}
