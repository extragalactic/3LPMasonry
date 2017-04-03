import React from 'react';
import { connect } from 'react-redux';

import CustomerDetails from './CustomerDetails';

const DEFAULT_CUSTOMER_ID = "58dc34c2fa3be310e66f7fb3"; // used for testing... perhaps use localStorage to remember the last customer id

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