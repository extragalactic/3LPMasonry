import React from 'react';
import { connect } from 'react-redux';

import CustomerDetails from './CustomerDetails';


class _CustomerDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {    
    return (
      <div>
        <CustomerDetails
          id={this.props.userID}
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