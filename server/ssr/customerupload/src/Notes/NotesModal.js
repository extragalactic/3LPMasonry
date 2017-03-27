import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import SelectField from 'material-ui/SelectField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { grey800, teal50 } from 'material-ui/styles/colors';
import Modal from 'react-modal';
import {Input, TextArea, GenericInput} from 'react-text-input'; 
import { Chimneys, Flagstone, Windowsills, Brickrepair, WaterProofing, Concrete, Foundation, Retaining } from '../Handbook/directions';

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

class NotesModal extends React.Component {
  constructor() {
    super();
    this.state = { value: 1 };
  }
  handleChange = (event, index, value) => this.setState({ value });

  render() {
console.log(this);
    const customStyles = {
    content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '50%',
    bottom                : '50%',
    marginRight           : '-50%',
    height                : '60%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    display: 'inline-block'
  

  }
};

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={this.props.close} className={'close'} >
          <FontIcon
            className="material-icons"
            style={iconStyles} color={red500}
          > close
          </FontIcon>
        </div>
        <p className="App-intro">
          Please give us a full and detailed decription of the issue.
        </p>
  
         <FlatButton 
         label="Submit" 
         primary={true} 
         style={style} ddsf
         fullWidth 
         backgroundColor={teal50}
         />
    <TextField
      hintText="What do you need fixed?"
      floatingLabelText="Tell us about your masonry woes, we can help"
      multiLine={true}
      rows={12}
      fullWidth
    />
      </Modal>
    );
  }


}

export default NotesModal;
