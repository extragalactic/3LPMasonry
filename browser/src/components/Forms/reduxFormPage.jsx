import CustomerForm from './reduxForm';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SubmitCustFormComp extends React.Component {
  constructor(){
    super()
  }
    
  handleSubmit = (values) => {
       
   this.props.mutate({ variables: { 
     firstName: values.firstName,
     lastName: values.lastName,
     email1: values.email1,
     cphone: values.cphone,
     address: 'testing' 
  }})
    this.props.next()
   }
  render() {
    return (
      <CustomerForm onSubmit={this.handleSubmit}/>
    );
  }
}

const submitUser = gql`
  mutation newCustomer($firstName:String!, $lastName:String!, $cphone: String, $email1: String, $address: String) {
  newCustomer(firstName:$firstName, lastName: $lastName, email1:$email1, cphone: $cphone, address:$address) {
    id
    firstName
    lastName
    email1
    cphone
  }
}`;


const SubmitCustForm = graphql(submitUser)(SubmitCustFormComp);

export default SubmitCustForm;