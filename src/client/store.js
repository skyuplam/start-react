import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';


export default function configureStore(initialState = {}) {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    createStore(),
    fromJS(initialState),
  );

  return store;
};
