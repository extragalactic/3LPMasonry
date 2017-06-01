import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CustomerDetails from './CustomerDetails';

// a default user for testing the Details page (perhaps use localStorage to remember the last customer id?)
const DEFAULT_CUSTOMER_ID = '58deb4ee184654537bea0096';
// a flag to assist with development testing
const _TEST_USER = false;

class _CustomerDetailsContainer extends React.Component {
  static propTypes = {
    userID: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]).isRequired,
  }
  componentDidMount() {
    // console.log('ID = ' + this.props.userID);
    if ((typeof this.props.userID !== 'string' || this.props.userID === '') && !_TEST_USER) {
      browserHistory.push('customers');
    }
  }

  render() {
    let custID = '';
    if (typeof this.props.userID !== 'string' && _TEST_USER) {
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

const CustomerDetailsContainer = connect(mapStateToProps)(_CustomerDetailsContainer);

export default CustomerDetailsContainer;
