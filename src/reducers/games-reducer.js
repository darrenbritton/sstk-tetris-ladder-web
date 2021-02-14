import { PERSIST_GAMES } from '../actions';

export default function (state = { pending: [], recent: [] }, action) {
  switch (action.type) {
    case PERSIST_GAMES:
      return action.payload;
    default:
      return state;
  }
}
