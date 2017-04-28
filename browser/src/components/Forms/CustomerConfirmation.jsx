import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { graphql, compose } from 'react-apollo';
import { browserHistory } from 'react-router';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ComunicationEmail from 'material-ui/svg-icons/communication/email';
import ComunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import ComunicationContactMail from 'material-ui/svg-icons/communication/contact-mail';
import HardwareSmartPhone from 'material-ui/svg-icons/hardware/smartphone';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionWork from 'material-ui/svg-icons/action/work';
import ComunicationLocation from 'material-ui/svg-icons/communication/location-on';
import ComunicationTextSms from 'material-ui/svg-icons/communication/textsms';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionSpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';

import ActionAssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import Infinite from 'react-infinite';
import { submitCustomer } from '../../graphql/mutations';
import { getCustomer } from '../../graphql/queries';

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

class _CustomerConfirmation extends React.Component {
  submitCustomer = () => {
    this.props.submitCustomer({
      variables: {
        id: this.props.custid,
      },
    }).then((res) => {
      if (res.data.submitCustomer.id) {
        browserHistory.push('/app');
      }
    });
  }
  render() {
    const customer = this.props.data.customer;
    if (!customer) {
      return <h7>Loading</h7>;
    }
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

const CustomerConfirmation = compose(
  graphql(getCustomer, {
    options: ({ custid }) => ({ variables: { id: custid } }),
  }),
  graphql(submitCustomer, { name: 'submitCustomer' }),
)(_CustomerConfirmation);


export default CustomerConfirmation;
