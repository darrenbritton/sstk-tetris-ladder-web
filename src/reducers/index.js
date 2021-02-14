import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import playerReducer from './player-reducer';
import leaderboardReducer from './leaderboard-reducer';
import challengesReducer from './challenges-reducer';
import notificationsReducer from './notifications-reducer';
import displayReducer from './display-reducer';
import gamesReducer from './games-reducer';
import playingReducer from './playing-reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  leaderboard: leaderboardReducer,
  challenges: challengesReducer,
  games: gamesReducer,
  player: playerReducer,
  notifications: notificationsReducer,
  display: displayReducer,
  playing: playingReducer,
});
export default createRootReducer;
