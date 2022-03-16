import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import NotAccess from '../../pages/NotAccess';

export default function PrivateRoute({ component: Component, role, ...rest }) {

  const { currentUser } = useAuth();

  return (
    <Route {...rest} render={props => {
      return currentUser ?
        (currentUser.idRole <= role ? <Component {...props} /> : <NotAccess />)
        :
        <Redirect to='/login' />
    }}>
    </Route>
  );
};
