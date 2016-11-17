import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export class MenuOptions extends React.Component {
   constructor() {
     super()
       this.state = {
         open: false,
       };
     this.handleTouchTap = this.handleTouchTap.bind(this);
     this.handleRequestClose = this.handleRequestClose.bind(this);
   }
  
  
    
  handleTouchTap (event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose () {
    this.setState({
      open: false,
    });
  };

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
    <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
   
      <MenuItem primaryText="Sign Up"
         onTouchTap={this.userHandleOpen}
         label="Dialog"
          />
      <MenuItem primaryText="Sign In"
         onTouchTap={this.userSigninOpen}
         label="Dialog"
       />
     
       <MenuItem primaryText="Practitioners"
      
         menuItems={[
           <MenuItem primaryText="Sign Up"
             onTouchTap={this.pSignupOpen}
          
           />, 

           <MenuItem primaryText="Sign In" 
            onTouchTap={this.pSigninOpen}
          />
         ]}
      />
      <MenuItem primaryText="Directory"
          label="Dialog"
          href='/directory'
          />

        <MenuItem primaryText="Logout"
          onTouchTap={this.logout}
          label="Dialog"
          href='/main'
          />
     </IconMenu>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
   
      <MenuItem primaryText="Sign Up"
         onTouchTap={this.userHandleOpen}
         label="Dialog"
          />
      <MenuItem primaryText="Sign In"
         onTouchTap={this.userSigninOpen}
         label="Dialog"
       />
     
       <MenuItem primaryText="Practitioners"
      
         menuItems={[
           <MenuItem primaryText="Sign Up"
             onTouchTap={this.pSignupOpen}
          
           />, 

           <MenuItem primaryText="Sign In" 
            onTouchTap={this.pSigninOpen}
          />
         ]}
      />
      <MenuItem primaryText="Directory"
          label="Dialog"
          href='/directory'
          />

        <MenuItem primaryText="Logout"
          onTouchTap={this.logout}
          label="Dialog"
          href='/main'
          />
     </IconMenu>
     </div>
    )
  }
}

export default MenuOptions;