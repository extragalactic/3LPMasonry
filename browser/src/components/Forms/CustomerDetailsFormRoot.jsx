import CustomerDetailsForm from './reduxCustomerDetailsForm';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from 'material-ui/Paper';

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


class CustomerDetailsFormRootComp extends React.Component {
  constructor(){
    super()
  }
    
  handleSubmit = (values) => {
    this.props.mutate({ variables: { 
     firstName: values.firstName,
     lastName: values.lastName,
     email1: values.email1,
     email2: values.email2,
     hphone: values.hphone,
     cphone: values.cphone,
     wphone: values.wphone,
  }}).then((data) => {
    localStorage.setItem('current_customer', data.data.newCustomer.id);
  })
    this.props.next()
   }
  render() {
    return (
      <div>
            <Paper style={styles.paperStyle} zDepth={1} >
            <br/>
            <h3>Enter Customer Details</h3>
            <CustomerDetailsForm onSubmit={this.handleSubmit}/>
            <br/>
            </Paper>
      </div>
    );
  }
}

const submitUser = gql`
  mutation newCustomer($firstName:String!, $lastName:String!, $email1: String, $email2: String, $hphone: String, $cphone: String, $wphone: String ) {
  newCustomer(firstName:$firstName, lastName: $lastName, email1:$email1, email2:$email2, hphone: $hphone, cphone: $cphone, wphone: $wphone) {
    id
    firstName
    lastName
    email1
    cphone
  }
}`;


const CustomerDetailsFormRoot = graphql(submitUser)(CustomerDetailsFormRootComp);

export default CustomerDetailsFormRoot;