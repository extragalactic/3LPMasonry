import React, { Component } from 'react';
<<<<<<< HEAD
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
=======
import logo from './logo.svg';
import './App.css';
import './carousel.css';
import "react-image-gallery/styles/css/image-gallery.css";
import { grey200 } from 'material-ui/styles/colors';
import { graphql, compose } from 'react-apollo';
import ImageGallery from 'react-image-gallery';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { filter } from 'lodash';
import Lightbox from 'react-images';
import Slider from 'react-slick';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { addSurveyPhoto, toggleSurveyReady } from './graphql/mutations';
var Carousel = require('react-responsive-carousel').Carousel;
import testImages from './testimages';
injectTapEventPlugin();


const styles = {
  paperStyle: {
    height:'50%',
    width: '60%',
    margin: 'auto',
    marginTop: '2%',
    backgroundColor: grey200,
  },
  photoStyle: {
    marginLeft: '20%',
    marginRight: '25%',
    marginTop: '10%',

  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

import NotesModal from './NotesModal';

>>>>>>> 7cc69413fc93049015f18716195602b617e5be69

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
<<<<<<< HEAD
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
=======
  handleImageLoad = (event) => {
    console.log('Image loaded ', event.target)
   }

   onChangeNotes = (notesText) => {
     this.setState({
       notesText,
     })
   }

closeNotesModal = () => {
  this.setState({
    notesModal: false,
  })
};

  onInputChange = (e) => {
    filter(
            e.target.files,
            file => file.type.match(this.props.fileTypeRegex) !== null,
        )
            .forEach(
                (file) => {
                  const reader = new FileReader();
                  reader.onload = this.props.onFileLoad;
                  reader.readAsDataURL(file);
                  setTimeout(() => {
                    this.state.images.push({ original: reader.result });
                    this.props.addSurveyPhoto({
                      variables: {
                        heading: 'OnlineEstimate',
                        description: 'OnlineEstimate',
                        orginalBase64: reader.result,
                        timestamp: new Date(),
                        custid: location.pathname.split('/')[2],
                      },
                    })
                    .then((img) => {
                    this.forceUpdate();
                    });
                  }, 1000);
                },
            );
  }
  render() {
     return (
      <MuiThemeProvider
        muiTheme={getMuiTheme(darkBaseTheme)}
      >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p className="App-intro">
          Upload your photos, get directions from handbook
          </p>
            <FlatButton
            backgroundColor={'#9E9E9E'}
            label="Handbook"
            href={'https://docs.google.com/document/d/1Efpw-8u8nEq6TROWQGO2gd9zLQHqJVx07_TNewMIaxU/pub'}
          />
          <br/>
          <br/>
          <FlatButton
            backgroundColor={'#9E9E9E'}
            label="Add Notes"
            onTouchTap={()=> this.setState({ notesModal: true})}
          />
          <br />
          <br />
          <FlatButton
            backgroundColor={'#9E9E9E'}
            label="Add Images"
            labelPosition="before"
            style={styles.uploadButton}
            containerElement="label"
          >
            <input multiple type="file" style={styles.uploadInput} onChange={(img, i) => this.onInputChange(img, i)} />
          </FlatButton>
          <br />
          <br />
          <br />
          <div
            style={styles.paperStyle}
          >
            <ImageGallery
              items={this.state.images}
              slideInterval={2000}
              onImageLoad={this.handleImageLoad}/>
            <FlatButton
              backgroundColor={'#9E9E9E'}
              label="Submit"
              fullWidth
            />
            <br />
            <br />
            <NotesModal
              onChangeNotes={this.onChangeNotes}
              open={this.state.notesModal}
              close={this.closeNotesModal}
              notesText={this.state.notesText}
            />
          </div>
        </div>
      </MuiThemeProvider>
     );
>>>>>>> 7cc69413fc93049015f18716195602b617e5be69
  }
}


const App = compose(
   graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
   graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
)(_App);

export default App;
