import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { red500 } from 'material-ui/styles/colors';
import Modal from 'react-modal';
import { graphql, compose } from 'react-apollo';
import '../App.css';
import { addSurveyNotes } from '../graphql/mutations';

const style = {
  position: 'fixed',
  bottom: 0,
  right: 0,
};
const iconStyles = {
  flex: 1,
  marginRight: 24,
  alignItem: 'right',
};
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    marginRight: '-50%',
    height: '60%',
    width: '85%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    display: 'inline-block',
  },
};

class _NotesModal extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      notes: '',
    };
  }
  handleChange = (event, index, value) => this.setState({ value });
  updateNotesInput = notes => this.setState({ notes });

  submitNotes = () => {
    this.props.addSurveyNotes({
      variables: {
        custid: location.pathname.split('/')[2],
        userid: '00001',
        heading: 'OnlineSurvey',
        description: 'OnlineSurvey',
        text: this.state.notes,
        timestamp: new Date(),
        user: 'OnlineSurvey',
        online: true,
      },
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
    this.setState({ notes: '' });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={'close'} >
          <FontIcon
            onClick={this.props.close}
            className="material-icons"
            style={iconStyles} color={red500}
          > close
          </FontIcon>
        </div>
        <p className="App-intro">
          Please give us a full and detailed decription of the issue.
        </p>
        <TextField
          hintText="What do you need fixed?"
          multiLine
          rows={12}
          maxRows={12}
          value={this.state.notes}
          onChange={(event, value) => this.updateNotesInput(value)}
        />
        <FlatButton
          label="Submit"
          primary
          style={style}
          fullWidth
          backgroundColor={'#F5F5F5'}
          onTouchTap={this.submitNotes}
        />
      </Modal>
    );
  }
}


const NotesModal = compose(
   graphql(addSurveyNotes, { name: 'addSurveyNotes' }),
)(_NotesModal);

export default NotesModal;
