import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';

export default class newCustomerForm extends React.Component {
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
            <Paper style={styles.paperStyle} zDepth={1} >
            <br/>
            <h3>Enter Customer Details </h3>
            <TextField
              hintText="First Name"
              underlineFocusStyle={styles.undelineStyle}
            />
              <TextField
              hintText="Last Name"
              underlineFocusStyle={styles.undelineStyle}
            />
              <TextField
              hintText="Email"
              underlineFocusStyle={styles.undelineStyle}
            />
              <TextField
              hintText="Phone Number"
              underlineFocusStyle={styles.undelineStyle}
            />
              <TextField
              hintText="Address"
              underlineFocusStyle={styles.undelineStyle}
            />
            <br/>
            <RaisedButton label="Submit"
              backgroundColor={grey500}
              />
            </Paper>
           );
  }
}

