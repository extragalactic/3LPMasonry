import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import styleCSS from '../../styles/customerDetailsStyles';


class AddNewNote extends React.Component {
  static propTypes = {
  	custid: React.PropTypes.string.isRequired,    
    submitNewNote: React.PropTypes.func.isRequired,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      noteText: ''
    };
  }

  onOpen = () => {
    this.setState({open: true});
  };

  onClose = () => {
    this.setState({open: false});
  };

  onChange = (e) => {
    this.setState({
      noteText: e.target.value
    })
  }

  onSubmit = () => {
    const storage = JSON.parse(localStorage.getItem('profile'));
    const name = storage.name;
    const userid = storage.user_id;

    this.props.submitNewNote({
      variables: {
        createdAt: 'office',
        text: this.state.noteText,
        custid: this.props.custid,
        userid: userid,
        name: name,
      }});
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.onClose}
      />,
      <FlatButton
        label="Add Note"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
      />
    ];

    return (
      <div>
        <FlatButton label="Add New Note" primary={true} onTouchTap={this.onOpen} />
        <Dialog style={styleCSS.newNoteDialog}
          title="New Note"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.onClose}
        >
          <TextField style={styleCSS.newNoteTextField}
            hintText="Enter your text here."
            multiLine={true}
            rows={2}
            rowsMax={4}
            value={this.state.noteText}
            onChange={this.onChange}
          />
        </Dialog>
      </div>
    );
  }
}

export default AddNewNote;