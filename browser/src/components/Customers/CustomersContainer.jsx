import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from "react-wobbly-spinner";
import LocationMap from '../Maps/LocationMap';

import CustomersTable from './customersTable';
import { getAllCustomers } from '../../graphql/queries';
import styleCSS from '../../styles/customerDetailsStyles';
import WarningMessage from '../Utils/WarningMessage';

_CustomersContainer.propTypes = {
  data: PropTypes.object.isRequired,
};

function _CustomersContainer(props) {
  if (props.data.loading) {
    return (
      <div style={styleCSS.spinnerInset}>
        <WobblySpinner diameter={200} />
      </div>
    );
  }
  if (!props.data.customers) {
    return (
      <div><WarningMessage message="There has been an error loading the customer data. Please contact the website admin." /></div>
    );
  }

  return (
    <div>
      <CustomersTable
        customers={props.data.customers}
      />
      {/* This is a hack to initialize the Google map streetview, so that it can go fullscreen on Chrome */}
      <LocationMap lat={43.6425} lon={-79.3892} mapWidth={1} mapHeight={1} />
    </div>
  );
}


const CustomersContainer = compose(
  graphql(getAllCustomers),
 )(_CustomersContainer);

export default CustomersContainer;
