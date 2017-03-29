import { grey50 } from 'material-ui/styles/colors';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import CustomerDispatchForm from './reduxCustomerDispatchForm';

const styles = {
  paperStyle: {
    width: 500,
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    textAlign: 'center',
  },
  undelineStyle: {
    borderColor: grey50,
  },
};

class CustomerDispatchFormRootComp extends React.Component {
  handleSubmit = (values) => {
    this.props.updateDispatch({ variables: {
      dispatch: values,
      id: this.props.currentCustomer,
    } });
    this.props.next();
  }
  render() {
    return (
      <div>
        <Paper style={styles.paperStyle} zDepth={1} >
          <br />
          <h3>Address and Dispatch</h3>
          <CustomerDispatchForm
            onSubmit={this.handleSubmit}
            surveyors={this.props.data.surveyors}
            currentCustomer={this.props.currentCustomer}
          />
          <br />
        </Paper>
      </div>
    );
  }
}
const getSurveyorsCustomers = gql`
  query getSurveyors{
    surveyors {
      id
      firstName
      lastName
      mobile
     }
  }`;

const CustomerDispatchFormQuery = graphql(getSurveyorsCustomers)(CustomerDispatchFormRootComp);

const updateDispatchInfo = gql`
  mutation updateDispatchInfo($dispatch:updateDispatch, $id:String) {
  updateDispatchInfo(dispatch:$dispatch, id: $id){
    firstName
    lastName
    id
  }
}`;

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const _CustomerDispatchFormRoot = graphql(updateDispatchInfo, { name: 'updateDispatch' })(CustomerDispatchFormQuery);

const CustomerDispatchFormRoot = connect(mapStateToProps)(_CustomerDispatchFormRoot);

export default CustomerDispatchFormRoot;
