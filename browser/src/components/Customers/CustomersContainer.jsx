import React from 'react';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from 'react-wobbly-spinner';

import CustomersTable from './customersTable';

import { getAllCustomers } from '../../graphql/queries';

class _CustomersContainer extends React.Component {

  componentDidMount() {

  }

  render() {
    if (this.props.data.loading) {
      return (
        <WobblySpinner diameter={200} />
      );
    }
    return (
      <div>
        <CustomersTable
          customers={this.props.data.customers}
        />
      </div>
    );
  }
}


const CustomersContainer = compose(
   graphql(getAllCustomers),
 )(_CustomersContainer);

export default CustomersContainer;
