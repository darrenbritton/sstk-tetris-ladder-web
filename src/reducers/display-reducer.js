import { TOGGLE_PLAYER_DRAWER } from "../actions";

export default function (state = { playerDrawer: false, breakDrawer: false }, action) {
  switch (action.type) {
    case TOGGLE_PLAYER_DRAWER:
      return {
        ...state,
        playerDrawer: !state.playerDrawer,
      };
    default:
      return state;
  }
}
