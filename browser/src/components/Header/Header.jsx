import React from 'react';
import AppBar from 'material-ui/AppBar';
import { grey800, grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AuthService from '../../utils/AuthService';
import { browserHistory } from 'react-router';

import auth0id from '../../assets/cred/authcred.js';
const auth = new AuthService(auth0id.auth0id, auth0id.domain);

import Login from '../Login/Login';

const headerStyle = {
    backgroundColor: grey800
};

const titleStyle = {
    color: grey400
};

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="New Customer"
      onTouchTap={props.data.newcustomer}
    />
    <MenuItem primaryText="Customers"
      onTouchTap={() => {console.log(props);}}
     />
    <MenuItem
    primaryText="Sign out"
    onTouchTap={props.data.logout}
   />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

export default class Header extends React.Component {

    constructor () {
        super();
        this.state = {
            logged: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.logout = this.logout.bind(this);
        this.newcustomer = this.newcustomer.bind(this);
    }
    componentDidMount () {
        setInterval(() => {
            if (auth.loggedIn()) {
                this.setState({
                    logged: true
                });
            } else {
                this.setState({
                    logged: false
                });
            }
        }, 200);
    }
    logout () {
        auth.logout();
        this.forceUpdate();
    }
    newcustomer () {
        browserHistory.push('/newcustomer');
    }

    render () {
        return (
      <AppBar title="Three Litte Pigs Masonry"
        style={headerStyle}
        titleStyle={titleStyle}
        iconElementRight={this.state.logged ?
        <Logged data={{ logout: this.logout, newcustomer: this.newcustomer }}/> : <Login />}
     />
        );
    }
}


