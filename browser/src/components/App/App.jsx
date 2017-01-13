import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

injectTapEventPlugin();

const App = (props) => {
  let children = null;
  if (props.children) {
    children = React.cloneElement(props.children, {
      auth: props.route.auth
    });
  }
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <Header />
        { children }
        <Footer />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
