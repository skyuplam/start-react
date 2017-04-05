import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './main';


const rootEl = document.getElementById('app');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./main.js', () => {
    render(App);  // Using Webpack 2, no require again. see https://webpack.js.org/guides/hmr-react/#code
  });
}


// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
