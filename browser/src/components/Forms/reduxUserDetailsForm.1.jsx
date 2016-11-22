import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'

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




class UserDetailsForm extends Component {
   
    
  componentDidMount() {
    this.refs.name            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField

    }
   
  render() {
    console.log(this.props.surveyor)
      const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
        <br/>
         <Field 
          name="firstName" 
          component={TextField} 
          floatingLabelText={this.props.firstName} 
          ref="name" withRef
          />
        </div>
        <div>
          <Field 
            name="lastName" 
            component={TextField} 
            hintText="Last Name" 
            ref="name" withRef
            />
        </div>
        <div>
          <Field name="mobile" component={TextField} hintText="Mobile" 
            ref="name" withRef/>
        </div>
        <br/>
       <Field 
          name="surveyor" 
          component={Checkbox}
          label={'Surveyor'}
          checked={true}
         />
       <Field name="estimator" 
         component={Checkbox} 
           />
       <Field name="office" 
         component={Checkbox} 
         />
      <br/>
      <FlatButton
        type={"submit"}
        primary={true}
      > Save</FlatButton>
      </form>
    );
  }
}

// Decorate the form component
UserDetailsForm = reduxForm({
  form: 'userdetails',

})(UserDetailsForm);

export default UserDetailsForm;
