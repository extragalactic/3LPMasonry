import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App/App';
import newCustomerForm from './components/Forms/newCustomer';
import AuthService from './utils/AuthService';
import HomePage from './components/Home/HomePage';
import auth0id from './assets/cred/authcred';
import userAdminPanel from './components/Admin/userAdminPanel';
import CustomerConfirmation from './components/Forms/CustomerConfirmation';


const auth = new AuthService(auth0id.auth0id, auth0id.domain);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/home' });
  }
};

export default (
  <Route path="/" >
    <Route path={'/app'} component={App} auth={auth} >
      <IndexRedirect to="/home" />
      <Route path="/confirm" component={CustomerConfirmation} />
      <Route path="/admin" component={userAdminPanel} onEnter={requireAuth} auth={auth} />
      <Route path="/newcustomer" component={newCustomerForm} onEnter={requireAuth} auth={auth} />
      <Route path="/home" component={HomePage} />
    </Route>
  </Route>
  );

if (module.hot) {
  module.hot.accept();
}
