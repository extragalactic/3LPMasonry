import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField,  Toggle} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';
import AddressAutocomplete from '../Forms/googleAutocomplete';


const toggleStyles = {
  block: {
    maxWidth: 250,
    position: 'relative',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};



const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email1']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email1 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email1)) {
    errors.email1 = 'Invalid email address'
  }
  if (values.email2 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email2)) {
    errors.email2 = 'Invalid email address'
  }
  return errors
}

class CustomerForm extends Component {

  componentDidMount() {
    this.refs.name            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
        <Field name="firstName" component={TextField} hintText="First Name" 
            ref="name" withRef/>
        </div>
        <div>
          <Field name="lastName" component={TextField} hintText="Last Name" 
            ref="name" withRef/>
        </div>
        <div>
          <Field name="email1" component={TextField} hintText="Email 1" 
            ref="name" withRef/>
        </div>
        
         <div>
          <Field name="email2" component={TextField} hintText="Email 2" 
            ref="name" withRef/>
        </div>

         <div>
          <Field name="hphone" component={TextField} hintText="Home Phone" 
            ref="name" withRef/>
        </div>

          <div>
          <Field name="cphone" component={TextField} hintText="Cell Phone" 
            ref="name" withRef type="tel"/>
         </div>

         <div>
          <Field name="wphone" component={TextField} hintText="Work Phone" 
            ref="name" withRef/>
          </div>    
        <br/>
        <RaisedButton
          type={"submit"}
          backgroundColor={grey500}
        > Submit </RaisedButton>
      </form>
    );
  }
}

// Decorate the form component
CustomerForm = reduxForm({
  form: 'contact',
  validate 
})(CustomerForm);

export default CustomerForm;




/*

     <div style={toggleStyles.block}>
          <Field name="email" component={Toggle} label="Email Notification" labelPosition="right" style={toggleStyles.toggle}/>
          <Field name="sms" component={Toggle} label="SMS Notification" labelPosition="right" style={toggleStyles.toggle}/>
          </div>

      


*/