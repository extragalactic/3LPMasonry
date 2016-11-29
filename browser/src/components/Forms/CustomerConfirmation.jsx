import React from 'react';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    paperStyle: {
        width: 600,
        position: 'relative',
        margin: 'auto',
        marginTop: 20
    },
    textStyle: {
        padding: 25
    },
    buttonStyle: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

export class CustomerConfirmationComp extends React.Component {
    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    componentDidMount () {
        axios.get(`/getnotes/${localStorage.current_customer}`).then((data) => {
            const ContentState = convertFromRaw(data.data);
            this.setState({
                editorState: EditorState.createWithContent(ContentState)
            });
        });
    }
    onChange = (event) => {
    };

    render () {
        if (this.props.data.loading) {
            return <h7>Loading</h7>;
        } else {
            const customer = this.props.data.customer;
            return (
      <div>
         <Paper zDepth={5} style={styles.paperStyle}>
         <div style={styles.textStyle}>
             First Name : {customer.firstName}
             <br/>
             Last Name : {customer.lastName}
             <br/>
             {customer.email1 ? `Email 1: ${customer.email1}` : null }
             <br/>
             {customer.email2 ? `Email 2: ${customer.email2}` : null }
             <br/>
             {customer.cphone ? `Mobile: ${customer.cphone}` : null }
             <br/>
             {customer.hphone ? `Home: ${customer.hphone}` : null }
             <br/>
             {customer.wphone ? `Work: ${customer.wphone}` : null }
             <br/>
             {customer.address ? `Address: ${customer.address}` : null }
             <br/>
             {customer.surveyor ? `Surveyor:  ${customer.surveyor.firstName}  ${customer.surveyor.lastName}` : null }
            <br/>
            <br/>
            {customer.email1Notificatoin || customer.email2Notification ?
                <div>
                  <h7> Email Corepondence </h7>
                  <br/>
                  {customer.email1Notification ? customer.email1 : null }
                  <br/>
                  {customer.email2Notification ? customer.email2 : null }
                  </div> : null }

                  <br/>
                 {customer.cellNotificatoin || customer.homeNotification || customer.workNotification ?
                  <div>
                  <h7> SMS Corepondence </h7>
                  <br/>
                  {customer.email1Notification ? customer.email1 : null }
                  <br/>
                  {customer.email2Notification ? customer.email2 : null }
                  </div> : null }
                  <br/>
                  {customer.sendSurvey ? <h7>Send Online Survey</h7> : null}
                  <br/>
                  <br/>
                  <h7> Notes</h7>
                    <Editor editorState={this.state.editorState} onChange={this.onChange} />
                    <br/>
                     <br/>
                      <RaisedButton
                        secondary={true}
                        label={"back"}
                        style={styles.buttonStyle}
                        onTouchTap={this.props.prev}
                      />
                      <RaisedButton
                        primary={true}
                        label={"submit"}
                        style={styles.buttonStyle}
                      />
                  </div>
                 </Paper>
              
        </div>
            );
        }
    }
}

const getFinalCustomerInfo = gql`
  query getFinalCustomerInfo {
    customer(id: "${localStorage.current_customer}" ) {
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

const CustomerConfirmation = graphql(getFinalCustomerInfo, {
    options: { pollInterval: 100 }
})(CustomerConfirmationComp);

export default CustomerConfirmation;
