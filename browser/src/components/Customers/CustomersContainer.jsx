import React from 'react';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from "react-wobbly-spinner";
import LocationMap from '../Maps/LocationMap';

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
      {/* This is a hack to initialize the Google map streetview, so that it can go fullscreen on Chrome */}
      <LocationMap lat={0} lon={0} mapWidth={1} mapHeight={1} />
    </div>
  );
}


const CustomersContainer = compose(
   graphql(getAllCustomers),
 )(_CustomersContainer);

export default CustomersContainer;
