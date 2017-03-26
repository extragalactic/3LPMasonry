import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { grey500, grey50 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

const paperStyle = {
  height: window.outerHeight / 3.5,
  width: window.innerWidth / 4,
  backgroundColor: grey50,
};

const editorStyle = {
  color: 'black',
  fontFamily: '\'Helvetica\', sans-serif',
  padding: 20,
};

class NotesModal extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
   const actions = [
       <FlatButton
        label="Close"
        secondary
        keyboardFocused
        onTouchTap={this.props.close}
      />,
    ];
    return (
       <Dialog
          open={this.props.open}
          actions={actions}
        >
         <Paper
           style={paperStyle}
         >
            <div
              style={editorStyle}
            >
              <TextField
                onChange={(event, value) => this.props.onChangeNotes(value)}
                value={this.props.notesText}
                placeholder="Describe your issue"                
                ref="notes"                
                multiLine
                underlineShow={false}
                name={'notes'}
                textareaStyle={{color:'black'}}
                fullWidth

              />
            </div>
          </Paper>
      
        </Dialog>
    )
  }


}

export default NotesModal;

/*


          <Snackbar
            open={this.state.snackBar}
            message="Notes Saved"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            contentStyle={{ textAlign: 'center' }}
          />

*/