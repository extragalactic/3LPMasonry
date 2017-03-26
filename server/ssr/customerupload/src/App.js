import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import MobileDetect from 'mobile-detect';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'react-image-gallery/styles/css/image-gallery.css';
import { addSurveyPhoto, toggleSurveyReady } from './graphql/mutations';
import './App.css';
import './carousel.css';
import WebViewContainer from './WebView/WebViewContainer';
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
  render() {
    if (!md.tablet() && !md.is('iPhone')) {
      return (
        <WebViewContainer
          addSurveyPhoto={this.props.addSurveyPhoto}
          toggleSurveyReady={this.props.toggleSurveyReady}
        />);
    }
    if (md.tablet()) {
      return (
        <div> tablet </div>
      );
    }
    if (md.is('iPhone')) {
      return (
        <div> iPhone</div>
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
