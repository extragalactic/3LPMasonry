import React from 'react';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from "react-wobbly-spinner";

import CustomersTable from './customersTable';
import { getAllCustomers } from '../../graphql/queries';


function _CustomersContainer (props) {

  if (props.data.loading) {
    return (
      <WobblySpinner diameter={200} />
    );
  }
  return (
    <div>
      <CustomersTable
        customers={props.data.customers}
      />
    </div>
  );
}


const CustomersContainer = compose(
   graphql(getAllCustomers),
 )(_CustomersContainer);

export default CustomersContainer;
