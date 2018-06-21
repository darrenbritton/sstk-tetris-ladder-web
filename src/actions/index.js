import { primus } from '../store';

export const PERSIST_PLAYER = 'persist-player';
export const PERSIST_LEADERBOARD = 'persist-leaderboard';
export const PERSIST_CHALLENGES = 'persist-challenges';
export const NOTIFY_GENERIC = 'notify-generic';
export const NOTIFY_CLEAR = 'notify-clear';
export const TOGGLE_PLAYER_DRAWER = 'toggle-player-drawer';
export const PLAYER_CHALLENGE = 'player-challenge';


export const persist = {
  player: payload => (dispatch) => {
    dispatch({
      type: PERSIST_PLAYER,
      payload,
    });
  },
  leaderboard: payload => (dispatch) => {
    dispatch({
      type: PERSIST_LEADERBOARD,
      payload,
    });
  },
  challenges: payload => (dispatch) => {
    dispatch({
      type: PERSIST_CHALLENGES,
      payload,
    });
  },
};

export const notify = {
  generic: payload => (dispatch) => {
    dispatch({
      type: NOTIFY_GENERIC,
      payload,
    });
  },
  clear: payload => (dispatch) => {
    dispatch({
      type: NOTIFY_CLEAR,
      payload,
    });
  },
};

export const player = {
  challenge: payload => (dispatch) => {
    primus.write({
      type: 'player.challenge',
      payload,
    });
    dispatch({
      type: PLAYER_CHALLENGE,
      payload,
    });
  },
};

export const display = {
  togglePlayerDrawer: () => (dispatch) => {
    dispatch({
      type: TOGGLE_PLAYER_DRAWER,
      payload: {},
    });
  }
};

export default {
  persist,
  notify,
  display,
  player
};
