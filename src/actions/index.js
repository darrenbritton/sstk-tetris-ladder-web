import { primus } from '../store';

export const PERSIST_PLAYER = 'persist-player';
export const PERSIST_LEADERBOARD = 'persist-leaderboard';
export const PERSIST_CHALLENGES = 'persist-challenges';
export const PERSIST_GAMES = 'persist-games';

export const NOTIFY_GENERIC = 'notify-generic';
export const NOTIFY_CLEAR = 'notify-clear';

export const TOGGLE_PLAYER_DRAWER = 'toggle-player-drawer';

export const PLAYER_CHALLENGE = 'player-challenge';
export const ACCEPT_CHALLENGE = 'accept-challenge';
export const REJECT_CHALLENGE = 'reject-challenge';


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
  games: payload => (dispatch) => {
    dispatch({
      type: PERSIST_GAMES,
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
  acceptChallenge: payload => (dispatch) => {
    primus.write({
      type: 'challenge.accept',
      payload,
    });
    dispatch({
      type: ACCEPT_CHALLENGE,
      payload,
    });
  },
  rejectChallenge: payload => (dispatch) => {
    primus.write({
      type: 'challenge.reject',
      payload,
    });
    dispatch({
      type: REJECT_CHALLENGE,
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
