import { grey50 } from 'material-ui/styles/colors';
import React from 'react';
import { graphql, compose } from 'react-apollo';
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

class _CustomerDispatchFormRootComp extends React.Component {
  handleSubmit = (values) => {
  values.address = this.props.autoComplete
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

const updateDispatchInfo = gql`
  mutation updateDispatchInfo($dispatch:updateDispatch, $id:String) {
  updateDispatchInfo(dispatch:$dispatch, id: $id){
    firstName
    lastName
    id
  }
}`;

const mapCustomerStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const mapAutoCompleteStateToProps = state => ({
  autoComplete: state.autoComplete,
});
const CustomerDispatchFormRoot = compose(
   connect(mapCustomerStateToProps, null),
   connect(mapAutoCompleteStateToProps, null),
   graphql(updateDispatchInfo, { name: 'updateDispatch' }),
   graphql(getSurveyorsCustomers),
)(_CustomerDispatchFormRootComp);

export default CustomerDispatchFormRoot;
