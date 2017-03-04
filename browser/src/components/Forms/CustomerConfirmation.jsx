import React from 'react';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import FlatButton from 'material-ui/FlatButton';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { browserHistory } from 'react-router';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ComunicationEmail from 'material-ui/svg-icons/communication/email';
import ComunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import ComunicationContactMail from 'material-ui/svg-icons/communication/contact-mail';
import { connect } from 'react-redux';
import HardwareSmartPhone from 'material-ui/svg-icons/hardware/smartphone';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionWork from 'material-ui/svg-icons/action/work';
import ComunicationLocation from 'material-ui/svg-icons/communication/location-on';
import ComunicationTextSms from 'material-ui/svg-icons/communication/textsms';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionSpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';

import ActionAssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import Infinite from 'react-infinite';

const styles = {
  paperStyle: {
    width: 600,
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
  },
  textStyle: {
    padding: 25,
  },
  buttonStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

class CustomerConfirmationComp extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    this.props.data.refetch({
      id: this.props.currentCustomer,
      options: { pollInterval: 1000 },
    });

    axios.get(`/getcustomer/${this.props.currentCustomer}`)
            .then((data) => {
              this.setState({
                currentCustomer: data.data,
              });
            });
  }

  onChange = () => {
  };

  submitCustomer = () => {
    this.props.mutate({ variables: {
      id: this.props.currentCustomer,
    } }).then((data) => {
      if (data.data.submitCustomer.id) {
        browserHistory.push('/app');
      }
    });
  }
  render() {
    console.log('notes', this)
    const customer = this.state.currentCustomer;
    if (!customer) {
      return <h7>Loading</h7>;
    } else {
      return (
        <div>
          <Paper zDepth={5} style={styles.paperStyle}>
            <div style={styles.textStyle}>
              <SocialPerson /> {customer.firstName} {customer.lastName}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {customer.email1 ?
                  <div>
                    <ComunicationEmail /> {customer.email1}
                  </div>
                 : null }
                {customer.email2 ?
                  <div>
                    <ComunicationMailOutline /> {customer.email2}
                  </div>
                : null }
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {customer.cphone ?
                  <div>
                    <HardwareSmartPhone /> {customer.cphone}
                  </div>
                : null }
                {customer.hphone ?
                  <div>
                    <ActionHome /> {customer.hphone}
                  </div>
                : null }
                {customer.wphone ?
                  <div>
                    <ActionWork /> {customer.wphone}
                  </div>
                 : null }
              </div>
              {customer.address ?
                <div>
                  <ComunicationLocation /> {customer.address}
                </div>
                 : null }
              {customer.surveyor ?
                <div>
                  <ActionAssignmentInd /> {customer.surveyor.firstName} {customer.surveyor.lastName}
                </div>
                    : null }
              {customer.email1Notificatoin || customer.email2Notification ?
                <div>
                  <ComunicationContactMail /> {customer.email1Notification ?
                   customer.email1 : null }, {customer.email2Notification ?
                   customer.email2
                 : null }
                </div> : null }
              {customer.cellNotificatoin || customer.homeNotification || customer.workNotification ?
                <div>
                  <ComunicationTextSms /> {customer.cellNotification ?
                    customer.cphone : null }, {customer.homeNotification ? customer.hphone : null }
                </div> : null }
              {customer.sendSurvey ?
                <div>
                  <ContentSend /> Photo Upload
                  </div>
                  : null}
              <br />
          
              <br />
              <br />
              <ActionSpeakerNotes />
              <Infinite containerHeight={100} elementHeight={100}>
                {customer.notes ? customer.notes.map((note, idx) => <div key={idx}> {note.text}</div>) : <div>no notes</div>}
              </Infinite>
              <FlatButton
                secondary
                label={'back'}
                style={styles.buttonStyle}
                onTouchTap={this.props.prev}
              />
              <FlatButton
                primary
                label={'submit'}
                style={styles.buttonStyle}
                onTouchTap={this.submitCustomer}
              />
            </div>
          </Paper>
        </div>
      );
    }
  }
}

const getFinalCustomerInfo = gql`
  query getFinalCustomerInfo($id: String) {
    customer(id: $id) {
    id    
    firstName
    lastName
    email1
    email2
    hphone
    cphone
    wphone
    address
    notes
    surveyor{
      firstName
      lastName
      id
      mobile
    }
    email1Notification
    email2Notification
    cellNotification
    homeNotification
    workNotificaiton
    sendSurvey    
  }
}`;

const submitCustomer = gql `
  mutation submitCustomer($id: String){
  submitCustomer(id: $id){
    id
  }
}`;

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});



const CustomerConfirmationQuery = graphql(getFinalCustomerInfo)(CustomerConfirmationComp);

const _CustomerConfirmation = graphql(submitCustomer)(CustomerConfirmationQuery);

const CustomerConfirmation = connect(mapStateToProps)(_CustomerConfirmation);

export default CustomerConfirmation;
