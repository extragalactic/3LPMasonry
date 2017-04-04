import React from 'react';
import { connect } from 'react-redux';

import CustomerDetails from './CustomerDetails';

// the default user for testing the Details page (perhaps use localStorage to remember the last customer id?)
const DEFAULT_CUSTOMER_ID = "58dfbac55d535f2ecb726a83"; 

class _CustomerDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ID = ' + this.props.userID);
  }

  render() {    
    return (
      <div>
        <CustomerDetails
          id={typeof this.props.userID === 'string'? this.props.userID : DEFAULT_CUSTOMER_ID}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.currentCustomer,
});


const CustomerDetailsContainer = connect( mapStateToProps )( _CustomerDetailsContainer );

export default CustomerDetailsContainer;