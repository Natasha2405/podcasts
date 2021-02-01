// vendor imports
import { Switch, Route } from 'react-router-dom';
// components
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home'

// constants
import ROUTES from './data/routes';
// styles


const App = () => {
  return (
    <div className="main-box">
      <Navbar />

      <Switch>
      <Route exact path={ROUTES.ROOT} component={Home} />

      </Switch>
    </div>
  );
};

export default App;
