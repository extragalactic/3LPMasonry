import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label, status }) => (
  <Checkbox label={label}
    defaultChecked={status}
    onCheck={input.onChange}/>
);

const UserDetailsForm = props => {
    const { handleSubmit } = props;
    return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="firstName" component={renderTextField} label={props.firstName}/>
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label={props.lastName}/>
      </div>
      <div>
        <Field name="mobile" component={renderTextField} label={props.mobile}/>
      </div>

      <div>
        <Field
          name="surveyor"
          component={renderCheckbox}
          label="Surveyor"
          status={props.surveyor}
      />
      </div>
        <div>
        <Field
          name="estimator"
          component={renderCheckbox}
          label="Estimator"
          status={props.estimator}
      />
      </div>

       <div>
        <Field
          name="office"
          component={renderCheckbox}
          label="Office"
          status={props.office}
      />
      </div>

     <br/>
      <div>
       <RaisedButton
         type={"submit"}
         label={"Save"}
         primary
       />
      </div>
    </form>
    );
};

export default reduxForm({
    form: 'userDetailsForm'  // a unique identifier for this form
})(UserDetailsForm);
