import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

injectTapEventPlugin();

export default class App extends React.Component {
    render () {
        let children = null;
        if (this.props.children) {
            children = React.cloneElement(this.props.children, {
                auth: this.props.route.auth //sends auth instance from route to children
            });
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
            <Header/>
            {children}
            <Footer/>
            </div>
            </MuiThemeProvider>
        );
    }
}
