
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import playerReducer from './player-reducer';
import leaderboardReducer from './leaderboard-reducer';
import challengesReducer from './challenges-reducer';
import notificationsReducer from './notifications-reducer';
import displayReducer from './display-reducer';

export default combineReducers({
  routing: routerReducer,
  leaderboard: leaderboardReducer,
  challenges: challengesReducer,
  player: playerReducer,
  notifications: notificationsReducer,
  display: displayReducer,
});
