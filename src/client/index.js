import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';


const rootEl = document.getElementById('app');
const render = (component) => {
  ReactDOM.render(
    <AppContainer>
      <component />
    </AppContainer>,
    rootEl
  );
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default;
    render(NewApp);
  });
}
