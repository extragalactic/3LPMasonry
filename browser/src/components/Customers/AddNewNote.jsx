import React from 'react';
import { graphql, compose } from 'react-apollo';
import { addNotes } from '../../graphql/mutations';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import styleCSS from '../../styles/customerDetailsStyles';


class _AddNewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpen = () => {
    this.setState({open: true});
  };

  onClose = () => {
    this.setState({open: false});
  };

  onSubmit = () => {
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
          />
        </Dialog>
      </div>
    );
  }
}

const AddNewNote = compose(
  graphql( addNotes, { name: 'addNotes', createAt: 'office', text: 'text goes here', user: {name: 'name', _id: '42'} })
 )( _AddNewNote );

export default AddNewNote;