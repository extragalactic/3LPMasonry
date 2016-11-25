import { grey50 } from 'material-ui/styles/colors';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from 'material-ui/Paper';
import CustomerDispatchForm from './reduxCustomerDispatchForm';
import FlatButton from 'material-ui/FlatButton';

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
        console.log(values);
        console.log(this);
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

const CustomerDispatchFormRoot = graphql(getSurveyorsCustomers, {
    options: { pollInterval: 100 }
})(CustomerDispatchFormRootComp);

export default CustomerDispatchFormRoot;
