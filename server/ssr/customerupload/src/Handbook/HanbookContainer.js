import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import SelectField from 'material-ui/SelectField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import { grey800 } from 'material-ui/styles/colors';
import { Chimneys, Flagstone, Windowsills, Brickrepair, WaterProofing, Concrete, Foundation, Retaining } from './directions';


class HanbookContainer extends React.Component {
  constructor() {
    super();
    this.state = { value: 1 };
  }
  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme(darkBaseTheme)}
      >
        <div className="App">
          <div
            className="App-header"
            onTouchTap={() => browserHistory.push('/home')}

          >
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p className="App-intro">
          Choose type of work from drop down.
            <br />
          Please follow directions carefully to ensure we can complete your estimate in a timeley manner.
          </p>
          <SelectField
            style={{
              backgroundColor: grey800,
            }}
            hintText="Frequency"
            value={this.state.value}
            onChange={this.handleChange}
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
        </div>
      </MuiThemeProvider>
    );
  }


}

export default HanbookContainer;
