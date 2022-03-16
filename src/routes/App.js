import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Clients from '../pages/Clients';
import Drawer from '../components/Drawer';
import ClientDetails from '../pages/ClientDetails';
import Cobro from '../pages/Cobro';
import Reports from '../pages/Reports'
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../components/PrivateRoute';
import Configuration from '../pages/Configuration';
import Hidrantes from '../pages/Hidrantes';
import ExpenseTracker from '../pages/ExpenseTracker';

import { AuthProvider } from '../hooks/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Drawer>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Redirect exact from='/' to='/clients'  />
              <PrivateRoute role={1} exact path="/register" component={Register} />
              <PrivateRoute role={2} exact path='/home' component={Home} />
              <PrivateRoute role={2} exact path='/clients' component={Clients} />
              <PrivateRoute role={2} exact path='/clients/:id' component={ClientDetails} />
              <PrivateRoute role={2} exact path='/cobro' component={Cobro} />
              <PrivateRoute role={2} exact path='/reports' component={Reports} />
              <PrivateRoute role={1} exact path='/configuration' component={Configuration} />
              <PrivateRoute role={2} exact path='/hidrantes' component={Hidrantes} />
              <PrivateRoute role={2} excat path='/expense_tracker' component={ExpenseTracker} />
            </Switch>
          </Drawer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
