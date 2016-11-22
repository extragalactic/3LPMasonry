import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField,  Toggle, AutoComplete } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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


class CustomerDispatchFormComp extends Component {
    constructor(){
      super()
       this.state = {
         data: []        
       }
       
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
    }

  componentDidMount() {
    this.refs.name            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  handleUpdateInput(input){
    this.props.data.refetch({
         searchTerm: input
    });
  
  const data = this.props.data.address.map((element)=> {
        return element.description
  })
   this.setState({
       data: data
   })
}

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
         <form onSubmit={handleSubmit}>
        <div>
        <Field 
          name="Address" 
          component={AutoComplete} 
          hintText="Address" 
          ref="name" withRef 
          dataSource={this.state.data}
          onUpdateInput={this.handleUpdateInput}
          />
         </div>
          
          <div style={toggleStyles.block}>
          <Field name="dispatch"
           component={Toggle} 
           label="Dispatch Surveyor" 
           labelPosition="right" 
           style={toggleStyles.toggle}
           checked={true}
           
           />
          <Field name="survey" component={Toggle} label="Send Survey Form" labelPosition="right" style={toggleStyles.toggle}/>
          <Field name="email" component={Toggle} label="Email Notification" labelPosition="right" style={toggleStyles.toggle}/>
          <Field name="sms" component={Toggle} label="SMS Notification" labelPosition="right" style={toggleStyles.toggle}/>
          </div>
          <div>
          <Field 
            name="Notes" 
            component={TextField} 
            hintText="Notes" 
            ref="name" withRef
            multiLine={true} 
            rows={5}
         />
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
CustomerDispatchFormComp = reduxForm({
  form: 'customerdispatch'
})(CustomerDispatchFormComp);


const searchAddress = gql`
  query searchAddress($searchTerm:String!){
    address(searchTerm:$searchTerm) {
      description
    } 
  }`;

const CustomerDispatchForm = graphql(searchAddress,{
  options:{ variables : {searchTerm: ''}}
})(CustomerDispatchFormComp);

export default CustomerDispatchForm;

