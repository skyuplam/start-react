import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router';

import App from './containers/App';
import createStore from './store';

const initialState = window.__APP_STATE__ || {};
const store = createStore(initialState);

const rootEl = document.getElementById('app');
const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>
    </Provider>,
    rootEl
  );
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./containers/App', () => {
    render(App);  // Using Webpack 2, no require again. see https://webpack.js.org/guides/hmr-react/#code
  });
}


// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
