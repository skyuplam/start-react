import React from 'react';

const ReactHotReloader = process.env.NODE_ENV === 'development' ?
  require('react-hot-loader').AppContainer :
  ({ children }) => React.Children.only(children);


export default ReactHotReloader;
