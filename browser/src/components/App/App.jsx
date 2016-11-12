import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class App extends React.Component {

  render() {
    return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
            <Header/>
            {this.props.children}
            <Footer/>
            </div>
            </MuiThemeProvider>
           );
  }
}
