import React from 'react';
import AppBar from 'material-ui/AppBar';
import { grey800, grey400 } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const headerStyle = {
  backgroundColor: grey800,
};

const titleStyle = {
  color: grey400,
};

export default class Header extends React.Component {
  render() {
    return (
      <AppBar title='Three Litte Pigs Masonry'
        style={headerStyle}
        titleStyle={titleStyle}
       />
    );
  }
}
