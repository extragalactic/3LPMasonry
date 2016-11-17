import React from 'react';
import { Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';
import App from './components/App/App';
import newCustomerForm from './components/Forms/newCustomer';
import SubmitCustForm from './components/Forms/reduxFormPage';
import AuthService from './utils/AuthService';
import Home from './components/Home/Home';
import Auth0Lock from 'auth0-lock';
import auth0id from './assets/authcred.js'
const auth = new AuthService(auth0id.auth0id, auth0id.domain);


const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/home' })
  }
}

export default (
  <Route path="/" component={App} auth={auth}>
  <IndexRedirect to="/home" />
  <Route path="/newcustomer" component={newCustomerForm} onEnter={requireAuth} auth={auth}/>
  <Route path="home" component={Home} />
  </Route>
  );

if (module.hot) {
  module.hot.accept();
}