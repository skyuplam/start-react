import React from 'react';
import { Match, Miss } from 'react-router';


const App = () =>
  <div>
    <p>DEMO</p>
    <Match
      exactly
      pattern="/"
      render={() =>
        (<p>Home</p>)
      }
    />
    <Miss component={() => (<p>Page Not Found</p>)} />
  </div>;


export default App;
