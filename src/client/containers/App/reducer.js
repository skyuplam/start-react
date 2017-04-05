import Immutable from 'seamless-immutable';

const initialState = Immutable({});


function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default appReducer;

