import React from 'react';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';


const App = () =>
  <div>
    <p>DEMO</p>
    <Switch>
      <Route
        exact
        to="/"
        render={() =>
            (<p>Home</p>)
        }
      />
      <Route render={() => (<p>Not Found!</p>)} />
    </Switch>
  </div>;


export default App;
