import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AutoComplete, SelectField, Checkbox } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { grey500 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Toggle from 'material-ui/Toggle';

const toggleStyles = {
    block: {
        maxWidth: 250,
        position: 'relative',
        textAlign: 'center',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    toggle: {
        marginBottom: 16
    },
    thumbOff: {
        backgroundColor: '#ffcccc'
    },
    trackOff: {
        backgroundColor: '#ff9d9d'
    },
    thumbSwitched: {
        backgroundColor: 'red'
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d'
    },
    labelStyle: {
        color: 'red'
    }
};

const renderToggle = ({ onToggle, label, status, style, labelPosition }) => (
  <Toggle label={label}
    defaultToggled={status}
    onToggle={onToggle}
    style={style}
    labelPosition={labelPosition}
    />
);

class CustomerDispatchFormComp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            surveyortoggle: false,
            smstoggle: false,
            emailtoggle: false,
            currentcustomer: {}
        };
    }

    componentDidMount () {
        this.refs.name            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus();                // on TextField
    }

    toggleDispatch = (event, value) => {
        this.setState({
            surveyortoggle: value
        });
    };

    toggleEmail = (event, value) => {
        this.setState({
            emailtoggle: value
        });

        this.props.mutate({ variables: {
            id: localStorage.current_customer
        } }).then((data) => {
            this.setState({
                currentcustomer: data.data.getCustomer
            });
        });
    };


    toggleSms = (event, value) => {
        this.setState({
            smstoggle: value
        });

        this.props.mutate({ variables: {
            id: localStorage.current_customer
        } }).then((data) => {
            this.setState({
                currentcustomer: data.data.getCustomer
            });
        });
    };

    handleUpdateInput = (input) => {
        this.props.data.refetch({
            searchTerm: input
        });

        const data = this.props.data.address.map((element) => {
            return element.description;
        });
        this.setState({
            data: data
        });
    }

    render () {
        const { handleSubmit } = this.props;
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

           <Toggle
              label="Dispatch Surveyor"
              labelPosition="right"
              style={toggleStyles.toggle}
              onToggle={this.toggleDispatch}
            />

           {this.state.surveyortoggle ?

          <Field
            name="surveyor"
            component={SelectField}
            hintText={"Select a Surveyor"}
            >

           {this.props.surveyors.map((surveyor, idx) => {
               return (<MenuItem value={{
                   firstName: surveyor.firstName,
                   lastName: surveyor.lastName,
                   mobile: surveyor.mobile,
                   id: surveyor.id
               }}
               primaryText={`${surveyor.firstName} ${surveyor.lastName}`}
            />);
           })}

           </Field> : null }
          <br/>
          <Toggle
              label="Email Notification"
              labelPosition="right"
              style={toggleStyles.toggle}
              onToggle={this.toggleEmail}
            />

            {this.state.emailtoggle && this.state.currentcustomer.email1 ?
             <div>
              <Field name="email1"
              component={Checkbox}
              label={`${this.state.currentcustomer.email1}`}
              />

              {this.state.currentcustomer.email2 ?
               <Field name="email2"
                 component={Checkbox}
                 label={`${this.state.currentcustomer.email2}`}
              />
                : null}
               </div>
                : null }
          <Toggle
              label="SMS Notification"
              labelPosition="right"
              style={toggleStyles.toggle}
              onToggle={this.toggleSms}
            />

            {this.state.smstoggle ?
             <div>

            {this.state.currentcustomer.cphone ?
               <Field name="cphone"
                 component={Checkbox}
                 label={`M: ${this.state.currentcustomer.cphone}`}
              />
                : null}

              {this.state.currentcustomer.hphone ?
               <Field name="hphone"
                 component={Checkbox}
                 label={`H: ${this.state.currentcustomer.hphone}`}
              />
                : null}

              {this.state.currentcustomer.wphone ?
               <Field name="wphone"
                 component={Checkbox}
                 label={`W: ${this.state.currentcustomer.wphone}`}
              />
                : null}
               </div>
                : null }
          <Field
            name="survey"
            component={renderToggle}
            label="Send Survey Form"
            labelPosition="right"
            style={toggleStyles.toggle}
            />

          </div>

          <br/>
          <RaisedButton
            type={"submit"}
            backgroundColor={grey500}
          > Save </RaisedButton>
          </form>
        );
    }
}

// Decorate the form component
CustomerDispatchFormComp = reduxForm({
    form: 'customerdispatch'
})(CustomerDispatchFormComp);

const searchAddress = gql`
  query 
    searchAddress($searchTerm:String!){
      address(searchTerm:$searchTerm) {
        description
      } 
  }`;

const getCustomer = gql`
  mutation getCustomer($id: String){
    getCustomer(id:$id) {
      id
      firstName
      lastName
      email1
      email2
      cphone
      hphone
      wphone
      address
    }
  }`;

const CustomerDispatchQuery = graphql(searchAddress, {
    options: { variables: { searchTerm: '' } }
})(CustomerDispatchFormComp);

const CustomerDispatchForm = graphql(getCustomer)(CustomerDispatchQuery);

export default CustomerDispatchForm;
