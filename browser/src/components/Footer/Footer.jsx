import React from 'react';
import { grey100, grey900 } from 'material-ui/styles/colors';
import { Footer, FooterSection, FooterLinkList } from 'react-mdl';

const footerStyle = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  backgroundColor: grey900,
  color: grey100,
  zIndex: 100
};

const Foot = () => (
  <Footer style={footerStyle} size="mini">
    <FooterSection type="bottom">
      <FooterLinkList>
          Copyright 2017 Three Little Pigs Masonry
          </FooterLinkList>
    </FooterSection>
  </Footer>
);

export default Foot;
