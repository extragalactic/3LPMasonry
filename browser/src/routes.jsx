import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App/App';
import newCustomerForm from './components/Forms/newCustomer';
import AuthService from './utils/AuthService';
import Home from './components/Home/Home';
import auth0id from './assets/cred/authcred.js';


//Company Routes
import userAdminPanel from './components/Admin/userAdminPanel';
import CustomerConfirmation from './components/Forms/CustomerConfirmation';
import CustomerApp from './components/customerfacing/components/App';

// Customer Facing Routes
import EmailTemplate from './components/customerfacing/components/Email';
import Survey from './components/customerfacing/components/Survey';

const auth = new AuthService(auth0id.auth0id, auth0id.domain);

const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/home' });
    }
};

export default (
  <Route path="/" >

  <Route path={"/app"} component={App} auth={auth} >
  <IndexRedirect to="/home" />
  <Route path="/confirm" component={CustomerConfirmation} />
  <Route path="/admin" component={userAdminPanel} onEnter={requireAuth} auth={auth}/>
  <Route path="/newcustomer" component={newCustomerForm} onEnter={requireAuth} auth={auth}/>
  <Route path="/home" component={Home} />
  </Route>

  <Route path={"/customer"} >
  <Route path="/customer/email" component={EmailTemplate} />
  <Route path="/customer/survey" component={Survey} />
  </Route>
  </Route>

  );

if (module.hot) {
    module.hot.accept();
}
