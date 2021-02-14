import { primus } from '../store';

export const PERSIST_PLAYER = 'persist-player';
export const PERSIST_LEADERBOARD = 'persist-leaderboard';
export const PERSIST_CHALLENGES = 'persist-challenges';
export const PERSIST_GAMES = 'persist-games';
export const PERSIST_PLAYING = 'persist-playing';

export const NOTIFY_GENERIC = 'notify-generic';
export const NOTIFY_CLEAR = 'notify-clear';

export const TOGGLE_PLAYER_DRAWER = 'toggle-player-drawer';
export const TOGGLE_PLAY_DIALOG = 'toggle-play-dialog';
export const DISPLAY_GAME_PROMPT = 'display-game-prompt';

export const PLAYER_CHALLENGE = 'player-challenge';
export const ACCEPT_CHALLENGE = 'accept-challenge';
export const REJECT_CHALLENGE = 'reject-challenge';

export const GAME_INITIATE = 'game-initiate';
export const GAME_REJECT = 'game-reject';
export const GAME_ACCEPT = 'game-accept';
export const GAME_WIN = 'game-win';
export const GAME_LOSE = 'game-lose';
export const GAME_CONTEST = 'game-contest';
export const GAME_CONFIRM = 'game-confirm';

export const persist = {
  player: (payload) => (dispatch) => {
    dispatch({
      type: PERSIST_PLAYER,
      payload,
    });
  },
  leaderboard: (payload) => (dispatch) => {
    dispatch({
      type: PERSIST_LEADERBOARD,
      payload,
    });
  },
  challenges: (payload) => (dispatch) => {
    dispatch({
      type: PERSIST_CHALLENGES,
      payload,
    });
  },
  games: (payload) => (dispatch) => {
    dispatch({
      type: PERSIST_GAMES,
      payload,
    });
  },
  playing: (payload) => (dispatch) => {
    dispatch({
      type: PERSIST_PLAYING,
      payload,
    });
  },
};

export const notify = {
  generic: (payload) => (dispatch) => {
    dispatch({
      type: NOTIFY_GENERIC,
      payload,
    });
  },
  clear: (payload) => (dispatch) => {
    dispatch({
      type: NOTIFY_CLEAR,
      payload,
    });
  },
};

export const player = {
  challenge: (payload) => (dispatch) => {
    primus.write({
      type: 'player.challenge',
      payload,
    });
    dispatch({
      type: PLAYER_CHALLENGE,
      payload,
    });
  },
  acceptChallenge: (payload) => (dispatch) => {
    primus.write({
      type: 'challenge.accept',
      payload,
    });
    dispatch({
      type: ACCEPT_CHALLENGE,
      payload,
    });
  },
  rejectChallenge: (payload) => (dispatch) => {
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
  },
  togglePlayDialog: () => (dispatch) => {
    dispatch({
      type: TOGGLE_PLAY_DIALOG,
      payload: {},
    });
  },
  gamePrompt: (payload) => (dispatch) => {
    dispatch({
      type: DISPLAY_GAME_PROMPT,
      payload,
    });
  },
};

export const game = {
  initiate: (payload) => (dispatch) => {
    primus.write({
      type: 'game.initiate',
      payload,
    });
    dispatch({
      type: GAME_INITIATE,
      payload,
    });
  },
  reject: (payload) => (dispatch) => {
    primus.write({
      type: 'game.reject',
      payload,
    });
    dispatch({
      type: GAME_REJECT,
      payload,
    });
  },
  accept: (payload) => (dispatch) => {
    primus.write({
      type: 'game.accept',
      payload,
    });
    dispatch({
      type: GAME_ACCEPT,
      payload,
    });
  },
  win: (payload) => (dispatch) => {
    primus.write({
      type: 'game.win',
      payload,
    });
    dispatch({
      type: GAME_WIN,
      payload,
    });
  },
  lose: (payload) => (dispatch) => {
    primus.write({
      type: 'game.lose',
      payload,
    });
    dispatch({
      type: GAME_LOSE,
      payload,
    });
  },
  contest: (payload) => (dispatch) => {
    primus.write({
      type: 'game.contest',
      payload,
    });
    dispatch({
      type: GAME_CONTEST,
      payload,
    });
  },
  confirm: (payload) => (dispatch) => {
    primus.write({
      type: 'game.confirm',
      payload,
    });
    dispatch({
      type: GAME_CONFIRM,
      payload,
    });
  },
};

export default {
  persist,
  notify,
  display,
  player,
  game,
};
