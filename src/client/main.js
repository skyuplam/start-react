import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router/Router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './containers/App';
import createStore from './store';

/* eslint-disable no-underscore-dangle */
const initialState = window.__APP_STATE__ || {};
const store = createStore(initialState);
const history = createBrowserHistory();

export default function Application() {
  return (
    <Provider store={store}>
      <Router history={history} >
        <App />
      </Router>
    </Provider>
  );
}

