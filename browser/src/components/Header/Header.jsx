import React from 'react';
import AppBar from 'material-ui/AppBar';
import { grey800, grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { browserHistory } from 'react-router';
import AuthService from '../../utils/AuthService';
import auth0id from '../../assets/cred/authcred';
import Login from '../Login/Login';

const auth = new AuthService(auth0id.auth0id, auth0id.domain);

const headerStyle = {
  backgroundColor: grey800,
};

const titleStyle = {
  color: grey400,
};

const Logged = ({ newcustomer, generics, logout, admin, customers }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="New Customer"
      onTouchTap={newcustomer}
    />
    <MenuItem
      primaryText="Customers"
      onTouchTap={customers}
    />
    <MenuItem
      primaryText="Admin"
      onTouchTap={admin}
    />
    <MenuItem
      primaryText="Sign out"
      onTouchTap={logout}
    />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      logged: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      if (auth.loggedIn()) {
        this.setState({
          logged: true,
        });
      } else {
        this.setState({
          logged: false,
        });
      }
    }, 200);
  }
  logout = () => {
    auth.logout();
    this.forceUpdate();
  }
  newcustomer = () => {
    browserHistory.push('/newcustomer');
  }
  customers = () => {
    browserHistory.push('/customers');
  }
  generics = () => {
    browserHistory.push('/generics');
  };
  admin = () => {
    browserHistory.push('/admin');
  };

  render() {
    return (
      <AppBar
        title="Three Litte Pigs Masonry"
        style={headerStyle}
        titleStyle={titleStyle}
        iconElementRight={this.state.logged ?
          <Logged
            logout={this.logout}
            newcustomer={this.newcustomer}
            generics={this.generics}
            admin={this.admin}
            customers={this.customers}
          /> : <Login />}
      />
    );
  }
}

/*
   
*/