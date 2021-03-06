import React, { PropTypes as T } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey400 } from 'material-ui/styles/colors';
import auth0cred from '../../assets/cred/authcred';
import AuthService from '../../utils/AuthService';

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService),
  }
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  static muiName = 'FlatButton';

  login() {
    const auth = new AuthService(auth0cred.auth0id, auth0cred.domain);
    auth.login();
  }

  render() {
    return (
      <div>
        <FlatButton
          {...this.props}
          backgroundColor={grey400}
          label="Login"
          onTouchTap={this.login}
        />
      </div>
    );
  }
}

export default Login;
