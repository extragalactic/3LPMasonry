import React from 'react'
import {grey100,grey900,pinkA100} from 'material-ui/styles/colors'
import { Footer, FooterSection, FooterLinkList } from 'react-mdl'

const footerStyle = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  backgroundColor: grey900,
  color: grey100,
};

export default class Foot extends React.Component {
  render() {
    return (
      <Footer style={footerStyle} size='mini'>
        <FooterSection type='bottom'>
          <FooterLinkList>
          Copyright 2016 Three Little Pigs Masonry
          </FooterLinkList>
        </FooterSection>
      </Footer>
   );
  }
}
