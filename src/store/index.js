import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import 'redux-devtools-extension';

import constants from '../constants';

import createRootReducer from '../reducers';
import actions from '../actions';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  createRootReducer(history), // root reducer with router state
  initialState,
  composedEnhancers,
);

export const primus = new window.Primus(`//${constants.serverUrl}`);
primus.on('data', function primusData(data) {
  if (data.action) {
    const actionGroup = data.action.split('.');
    if (actions[actionGroup[0]][actionGroup[1]]) {
      store.dispatch(actions[actionGroup[0]][actionGroup[1]].call(this, data.payload || {}));
    }
  }
});

export default store;
