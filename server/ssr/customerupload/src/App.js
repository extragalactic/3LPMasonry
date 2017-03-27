import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import MobileDetect from 'mobile-detect';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Router, browserHistory } from 'react-router';
import { addSurveyPhoto, toggleSurveyReady } from './graphql/mutations';
import './App.css';
import './carousel.css';

import WebViewContainer from './WebView/WebViewContainer';
import MobileContainer from './MobileView/MobileContainer';


injectTapEventPlugin();
const md = new MobileDetect(window.navigator.userAgent)

class _App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      lightboxIsOpen: false,
      notesModal: false,
      notesText: '',
    };
  }
  componentDidMount() {
  }
  exit = () => {
    window.close();
  }
  render() {
    if (!md.tablet() && !md.is('iPhone')) {
      return (
        <WebViewContainer
          exit={this.exit}
          addSurveyPhoto={this.props.addSurveyPhoto}
          toggleSurveyReady={this.props.toggleSurveyReady}
        />
        );
    }
    if (md.tablet()) {
      return (
        <WebViewContainer
          exit={this.exit}
          addSurveyPhoto={this.props.addSurveyPhoto}
          toggleSurveyReady={this.props.toggleSurveyReady}
        />
      );
    }
    if (md.phone()) {
      return (
        <MobileContainer
          exit={this.exit}
          addSurveyPhoto={this.props.addSurveyPhoto}
          toggleSurveyReady={this.props.toggleSurveyReady}
        />
      );
    }
    return (
      <div> Android</div>
    );
  }
}


const App = compose(
   graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
   graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
)(_App);

export default App;
