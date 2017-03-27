import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import SelectField from 'material-ui/SelectField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, lightBlue100,blue500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { grey800 } from 'material-ui/styles/colors';
import Modal from 'react-modal';
import { Chimneys, Flagstone, Windowsills, Brickrepair, WaterProofing, Concrete, Foundation, Retaining } from './directions';

const iconStyles = {
  flex: 1,
  marginRight: 24,
  alignItem: 'right',
};

class HanbookModal extends React.Component {
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
    height                : '90%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    display: 'inline-block',

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
          Choose type of work from drop down.
          <br />
          Please follow directions carefully to ensure
          we can complete your estimate in a timeley manner.
        </p>
        <div
          className={'menu'}
        >
        <SelectField
          hintText="Frequency"
          value={this.state.value}
          onChange={this.handleChange}
          style={{
            backgroundColor: '#F5F5F5'
          }}
        >
          <MenuItem value={1} primaryText="Chimneys" />
          <MenuItem value={2} primaryText="Flagstone" />
          <MenuItem value={3} primaryText="Window Sills" />
          <MenuItem value={4} primaryText="Brick Repairs" />
          <MenuItem value={5} primaryText="Waterproofing" />
          <MenuItem value={6} primaryText="Concrete Install/Repair" />
          <MenuItem value={7} primaryText="Foundation Repair/Parging" />
          <MenuItem value={8} primaryText="Retaininng Walls" />
        </SelectField>
        </div>
        <div>
          { this.state.value === 1 ? Chimneys() : null}
          { this.state.value === 2 ? Flagstone() : null}
          { this.state.value === 3 ? Windowsills() : null}
          { this.state.value === 4 ? Brickrepair() : null}
          { this.state.value === 5 ? WaterProofing() : null}
          { this.state.value === 6 ? Concrete() : null}
          { this.state.value === 7 ? Foundation() : null}
          { this.state.value === 8 ? Retaining() : null}
        </div>
      </Modal>
    );
  }


}

export default HanbookModal;
