import { TOGGLE_PLAYER_DRAWER, TOGGLE_PLAY_DIALOG, DISPLAY_GAME_PROMPT } from "../actions";

export default function (state = { playerDrawer: false, breakDrawer: false, playDialog: false }, action) {
  switch (action.type) {
    case TOGGLE_PLAYER_DRAWER:
      return {
        ...state,
        playerDrawer: !state.playerDrawer,
      };
    case TOGGLE_PLAY_DIALOG:
      return {
        ...state,
        playDialog: !state.playDialog,
      };
    case DISPLAY_GAME_PROMPT:
      return {
        ...state,
        playDialog: true,
      };
    default:
      return state;
  }
}
