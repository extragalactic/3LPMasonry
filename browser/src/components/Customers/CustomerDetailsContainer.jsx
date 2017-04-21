import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CustomerDetails from './CustomerDetails';

// the default user for testing the Details page (perhaps use localStorage to remember the last customer id?)
const DEFAULT_CUSTOMER_ID = "58deb4ee184654537bea0096"; 
// a flag to assist with development testing
const _TEST_USER = false;

class _CustomerDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ID = ' + this.props.userID);

    if(typeof this.props.userID != 'string' && !_TEST_USER) {
       browserHistory.push('customers');
    }
  }

  render() { 
    let custID = "";

    if(typeof this.props.userID != 'string') {
      custID = DEFAULT_CUSTOMER_ID;
    } else {
      custID = this.props.userID;
    }

    return (
      <div>
         <CustomerDetails id={custID} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.currentCustomer,
});

const CustomerDetailsContainer = connect( mapStateToProps )( _CustomerDetailsContainer );

export default CustomerDetailsContainer;