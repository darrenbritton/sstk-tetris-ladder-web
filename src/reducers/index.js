
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import playerReducer from './player-reducer';
import leaderboardReducer from './leaderboard-reducer';
import notificationsReducer from './notifications-reducer';
import displayReducer from './display-reducer';

export default combineReducers({
  routing: routerReducer,
  leaderboard: leaderboardReducer,
  player: playerReducer,
  notifications: notificationsReducer,
  display: displayReducer,
});
