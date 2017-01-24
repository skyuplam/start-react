import { combineReducers } from 'redux-immutable';


import globalReducer from './containers/App/reducer';


export default function createReducer() {
  return combineReducers({
    global: globalReducer,
  });
}
