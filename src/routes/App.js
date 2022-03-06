import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path='/home' component={Home} />
              <PrivateRoute exact path='/clients' component={Clients} />
              <PrivateRoute exact path='/clients/:id' component={ClientDetails} />
              <PrivateRoute exact path='/cobro' component={Cobro} />
              <PrivateRoute exact path='/reports' component={Reports} />
              <PrivateRoute exact path='/configuration' component={Configuration} />
              <PrivateRoute exact path='/hidrantes' component={Hidrantes} />
              <PrivateRoute excat path='/expense_tracker' component={ExpenseTracker} />
            </Switch>
          </Drawer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
