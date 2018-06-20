import { PERSIST_LEADERBOARD } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case PERSIST_LEADERBOARD:
      return action.payload;
    default:
      return state;
  }
}
