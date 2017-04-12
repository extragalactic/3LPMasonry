import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CustomerDetails from './CustomerDetails';

// a flag to assist with development testing
const _TEST_USER = true;

class _CustomerDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ID = ' + this.props.userID);
  }

  render() { 
    let custID = this.props.userID;

    if(typeof this.props.userID != 'string') {
      if(_TEST_USER) {
        custID = "58deb4ee184654537bea0096";
      } else {
        browserHistory.push('customers');
      } 
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