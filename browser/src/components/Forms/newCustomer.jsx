import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

 class newCustomerFormComp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email1: '',
      cphone: '',
      address: '',
      open: false
    };
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail1 = this.changeEmail1.bind(this);
    this.changeCellPhone = this.changeCellPhone.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  changeFirstName(event) {
     this.setState({
       firstName: event.target.value
     })
  }

  changeLastName(event) {
     this.setState({
       lastName: event.target.value
     })
  }

  changeEmail1(event) {
     this.setState({
       email1: event.target.value
     })
  }

  changeCellPhone(event) {
     this.setState({
       cphone: event.target.value
     })
  }

  changeAddress(event) {
     this.setState({
       address: event.target.value
     })
  }

 submitForm(){
   this.props.mutate({ variables: { 
     firstName: this.state.firstName,
     lastName: this.state.lastName,
     email1: this.state.email1,
     cphone: this.state.cphone,
     address: this.state.address    
  }})
     .then((data) => {
       console.log(data)
     })
   
  this.setState({
    firstName: '',
     lastName: '',
     email1: '',
     cphone: '',
     address: '',
     open: true   
  })  
}

handleRequestClose (){
    this.setState({
      open: false
    });
  };

  render() {
       const styles = {
      paperStyle: {
        height: 400,
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
    return (
            <div>
            <Paper style={styles.paperStyle} zDepth={1} >
            <br/>
            <h3>Enter Customer Details!</h3>
            <TextField
              hintText="First Name"
              underlineFocusStyle={styles.undelineStyle}
              onChange={this.changeFirstName}
              value={this.state.firstName}
            />
              <TextField
              hintText="Last Name"
              underlineFocusStyle={styles.undelineStyle}
              onChange={this.changeLastName}
              value={this.state.lastName}
            
            />
              <TextField
              hintText="Email"
              underlineFocusStyle={styles.undelineStyle}
              onChange={this.changeEmail1}
              value={this.state.email1}
        
            />
              <TextField
              hintText="Phone Number"
              underlineFocusStyle={styles.undelineStyle}
              onChange={this.changeCellPhone}
              value={this.state.cphone}
            
            />         
            
              <TextField
              hintText="Address"
              underlineFocusStyle={styles.undelineStyle}
              onChange={this.changeAddress}
              value={this.state.address}
            />
            <br/>
              <br/>
            <RaisedButton label="Submit"
              backgroundColor={grey500}
              onTouchTap={this.submitForm.bind(this)}
              />
             </Paper>

            <Snackbar
             open={this.state.open}
             message="Customer Added!"
             autoHideDuration={4000}
             onRequestClose={this.handleRequestClose}
             />
             </div>
               );
  }
}

newCustomerFormComp.propTypes = {
  mutate: PropTypes.func.isRequired,
};

const submitUser = gql`
  mutation newCustomer($firstName:String!, $lastName:String!, $cphone: String, $email1: String, $address: String) {
  newCustomer(firstName:$firstName, lastName: $lastName, email1:$email1, cphone: $cphone, address:$address) {
    id
    firstName
    lastName
    email1
    cphone
    address
  }
}`;

const newCustomerForm = graphql(submitUser)(newCustomerFormComp);

export default newCustomerForm