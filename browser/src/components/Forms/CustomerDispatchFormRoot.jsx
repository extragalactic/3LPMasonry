import { grey50 } from 'material-ui/styles/colors';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from 'material-ui/Paper';
import CustomerDispatchForm from './reduxCustomerDispatchForm';

const styles = {
    paperStyle: {
        width: 500,
        position: 'relative',
        margin: 'auto',
        marginTop: 20,
        textAlign: 'center'
    },
    undelineStyle: {
        borderColor: grey50
    }
};

class CustomerDispatchFormRootComp extends React.Component {
    constructor () {
        super();
    }

    handleSubmit = (values) => {
        this.props.updateDispatch({ variables: {
            dispatch: values,
            id: localStorage.current_customer
        } });
        this.props.next();
    }
    render () {
        return (
            <div>
            <Paper style={styles.paperStyle} zDepth={1} >
            <br/>
            <h3>Address and Dispatch</h3>
            <CustomerDispatchForm
              onSubmit={this.handleSubmit}
              surveyors={this.props.data.surveyors}
              customer={this.props.data.customer}
              />
            <br/>
            </Paper>
      </div>
        );
    }
}

const getSurveyorsCustomers = gql`
  query getCurrentCustomer{
    surveyors {
      id
      firstName
      lastName
      mobile
     }
  }`;

const CustomerDispatchFormQuery = graphql(getSurveyorsCustomers, {
    options: { pollInterval: 100 }
})(CustomerDispatchFormRootComp);

const updateDispatchInfo = gql`
  mutation updateDispatchInfo($dispatch:updateDispatch, $id:String) {
  updateDispatchInfo(dispatch:$dispatch, id: $id){
    firstName
    lastName
    id
  }
}`;

const CustomerDispatchFormRoot = graphql(updateDispatchInfo, { name: 'updateDispatch' })(CustomerDispatchFormQuery);

export default CustomerDispatchFormRoot;
