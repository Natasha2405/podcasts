import React from 'react';
import { Navigation } from './Navigation';
import { Switch, Route } from 'react-router-dom';
import { Podcasts } from './Podcasts';

class App extends React.Component {

  render() {

    return (
      <div id="app">
        <h2>App Podcasts</h2>
        
        <Navigation />

        <Switch>
          <Route path="/podcasts" component={Podcasts} />
        </Switch>

      </div>
    )
  }
};

export default App;
