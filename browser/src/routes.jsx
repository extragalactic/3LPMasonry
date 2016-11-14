import React from 'react';
import { Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/App/App';
import newCustomerForm from './components/Forms/newCustomer';
import SubmitCustForm from './components/Forms/reduxFormPage';

export default (
  <Route path="/" component={App}>
   <Route path="/newcustomer" component={newCustomerForm} />
   </Route>
   );

if (module.hot) {
  module.hot.accept();
}