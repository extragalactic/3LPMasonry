import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AutoComplete, SelectField, Checkbox, Toggle as toggle } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { grey500, grey50 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { graphql, compose } from 'react-apollo';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';


import { searchAddress } from '../../graphql/queries';
import { getCustomer, addNotes } from '../../graphql/mutations';

const toggleStyles = {
  block: {
    maxWidth: 250,
    position: 'relative',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
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
const paperStyle = {
  height: 400,
  width: 720,
  display: 'inline-block',
  backgroundColor: grey50,
};

const buttonStyle = {
  marginLeft: 90,
};
const dialogStyle = {
  width: 600,
  position: 'absolute',
  marginRight: 500,
};
const editorStyle = {
  color: 'black',
  fontFamily: '\'Helvetica\', sans-serif',
  padding: 20,
};

class CustomerDispatchFormComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dialog: false,
      surveyortoggle: false,
      smstoggle: false,
      emailtoggle: false,
      notesopen: false,
      currentcustomer: {},
      notes: '',
      editorState: EditorState.createEmpty(),
      snackBar: false,
    };
    this.onChange = editorState => this.setState({ editorState });
    this.focus = () => this.refs.notes.focus();

        
  }

  componentDidMount() {
    this.refs.name            // the Field
        .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
        .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
        .focus();                // on TextField
  }
  onChangeNotes = (notes, text) => {
   // console.log(notes)
    console.log('text', text)
    this.setState({
      notes: text
    })
  };
  handleRequestClose = () => {
    this.setState({
      snackBar: false,
    });
  };
  openNotesDialog = () => {
    this.setState({
      dialog: true,
    });
  };
  closeNotesDialog = () => {
    this.setState({
      dialog: false,
    });
  };

  toggleDispatch = (event, value) => {
    this.setState({
      surveyortoggle: value,
    });
  };

  toggleEmail = (event, value) => {
    this.setState({
      emailtoggle: value,
    });

    this.props.getCustomer({ variables: {
      id: this.props.currentCustomer,
    } }).then((data) => {
      this.setState({
        currentcustomer: data.data.getCustomer,
      });
    });
  };

  toggleSms = (event, value) => {
    this.setState({
      smstoggle: value,
    });

    this.props.getCustomer({ variables: {
      id: this.props.currentCustomer,
    } }).then((data) => {
      this.setState({
        currentcustomer: data.data.getCustomer,
      });
    });
  };

  handleUpdateInput = (input) => {
    this.props.data.refetch({
      searchTerm: input,
    });
    if (this.props.data.address) {
      const data = this.props.data.address.map(element => element.description);
      this.setState({ data });
    }
  };
  submitNotes = () => {
    this.props.addNotes({
      variables: {
        custid: this.props.currentCustomer,
        text: this.state.notes,
        name:  JSON.parse(localStorage.profile).name,
        createdAt: new Date(),
        userid:  JSON.parse(localStorage.profile).identities[0].user_id
      },
    });
    this.setState({ notes: '' });
  };

  render() {
    const actions = [
      <FlatButton
        label="Save"
        primary
        onTouchTap={this.submitNotes}
      />,
      <FlatButton
        label="Close"
        secondary
        keyboardFocused
        onTouchTap={this.closeNotesDialog}
      />,
    ];

    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="address"
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
                hintText={'Select a Surveyor'}
              >
                {this.props.surveyors.map((surveyor, idx) => (
                  <MenuItem
                    value={{
                      firstName: surveyor.firstName,
                      lastName: surveyor.lastName,
                      mobile: surveyor.mobile,
                      id: surveyor.id,
                    }}
                    primaryText={`${surveyor.firstName} ${surveyor.lastName}`}
                    key={idx}
                  />))}
              </Field> : null }
            <br />
            <Toggle
              label="Email Notification"
              labelPosition="right"
              style={toggleStyles.toggle}
              onToggle={this.toggleEmail}
            />

            {this.state.emailtoggle && this.state.currentcustomer.email1 ?
              <div>
                <Field
                  name="email1"
                  component={Checkbox}
                  label={`${this.state.currentcustomer.email1}`}
                />
                {this.state.currentcustomer.email2 ?
                  <Field
                    name="email2"
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
                  <Field
                    name="cphone"
                    component={Checkbox}
                    label={`M: ${this.state.currentcustomer.cphone}`}
                  />
                : null}
                {this.state.currentcustomer.hphone ?
                  <Field
                    name="hphone"
                    component={Checkbox}
                    label={`H: ${this.state.currentcustomer.hphone}`}
                  />
                : null}
                {this.state.currentcustomer.wphone ?
                  <Field
                    name="wphone"
                    component={Checkbox}
                    label={`W: ${this.state.currentcustomer.wphone}`}
                  />
                : null}
              </div>
                : null }
            <Field
              name="survey"
              component={toggle}
              label="Send Survey Form"
              labelPosition="right"
              style={toggleStyles.toggle}
            />

          </div>
          <FlatButton
            label={'notes'}
            primary
            onTouchTap={this.openNotesDialog}
          />
          <br />
          <RaisedButton
            type={'submit'}
            backgroundColor={grey500}
          > Save </RaisedButton>
        </form>
        <Dialog
          open={this.state.dialog}
          actions={actions}
        >
          <Paper
            style={paperStyle}
            onClick={this.focus}
          >
            <div
              style={editorStyle}
              onClick={this.focus}
            >
              <TextField
                onChange={this.onChangeNotes}
                value={this.state.notes}
                placeholder="Add some notes..."                
                ref="notes"                
                multiLine
                underlineShow={false}
                name={'notes'}
                textareaStyle={{color:'black'}}
                fullWidth

              />
            </div>
          </Paper>
          <Snackbar
            open={this.state.snackBar}
            message="Notes Saved"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            contentStyle={{ textAlign: 'center' }}
          />
        </Dialog>
      </div>
    );
  }
}

CustomerDispatchFormComp.propTypes = {
  getCustomer: PropTypes.func.isRequired,
};

// Decorate the form component
CustomerDispatchFormComp = reduxForm({
  form: 'customerdispatch',
})(CustomerDispatchFormComp);

const CustomerDispatchForm = compose(
   graphql(searchAddress, { options: { variables: { searchTerm: '' } } }),
   graphql(getCustomer, { name: 'getCustomer' }),
  graphql(addNotes, { name: 'addNotes' }),
)(CustomerDispatchFormComp);

export default CustomerDispatchForm;
