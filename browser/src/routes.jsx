import React from 'react';
import { Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import Auth0Lock from 'auth0-lock';

import App from './components/App/App';
import newCustomerForm from './components/Forms/newCustomer';
import AuthService from './utils/AuthService';
import Home from './components/Home/Home';
import auth0id from './assets/cred/authcred.js';



import userAdminPanel from './components/Admin/userAdminPanel';
import CustomerDetailsFormRootComp from './components/Forms/CustomerDetailsFormRoot';
import CustomerDispatchFormRoot from './components/Forms/CustomerDispatchFormRoot';
import CustomerConfirmation from './components/Forms/CustomerConfirmation';


const auth = new AuthService(auth0id.auth0id, auth0id.domain);

const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/home' });
    }
};

export default (
  <Route path="/" component={App} auth={auth}>
  <IndexRedirect to="/home" />
  <Route path="/newroot" component={CustomerDetailsFormRootComp} />
  <Route path="/dispatch" component={CustomerDispatchFormRoot} />
   <Route path="/confirm" component={CustomerConfirmation} />

  <Route path="/admin" component={userAdminPanel} onEnter={requireAuth} auth={auth}/>
  <Route path="/newcustomer" component={newCustomerForm} onEnter={requireAuth} auth={auth}/>
  <Route path="/home" component={Home} />

  </Route>
  );

if (module.hot) {
    module.hot.accept();
}
