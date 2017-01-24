import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router';
import App from './containers/App';


const rootEl = document.getElementById('app');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
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
