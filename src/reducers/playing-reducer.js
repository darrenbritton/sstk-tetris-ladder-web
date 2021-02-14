import { PERSIST_PLAYING, DISPLAY_GAME_PROMPT } from '../actions';

export default function (state = { waitingForPlayer: true }, action) {
  switch (action.type) {
    case PERSIST_PLAYING:
      if (Object.keys(action.payload).length === 0) {
        return { waitingForPlayer: true };
      }
      return action.payload;

    case DISPLAY_GAME_PROMPT:
      return action.payload;
    default:
      return state;
  }
}
