import React from 'react';
import { Match, Miss } from 'react-router';


const App = () =>
  <div>
    <p>DEMO</p>
    <Match
      exactly
      pattern="/"
      render={(props) =>
        <p>Home</p>
      }
    >
    </Match>
    <Miss component={(props) => <p>Page Not Found</p>} />
  </div>


export default App;
