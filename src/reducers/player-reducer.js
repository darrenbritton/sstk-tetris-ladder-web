import { PERSIST_PLAYER } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case PERSIST_PLAYER:
      return action.payload;
    default:
      return state;
  }
}
