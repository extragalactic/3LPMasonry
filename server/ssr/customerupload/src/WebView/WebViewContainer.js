import React, { Component } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { filter } from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { grey200 } from 'material-ui/styles/colors';
import NotesModal from '../Notes/NotesModal';
import logo from '../logo.svg';
import '../App.css';
import '../carousel.css';

import HandbookModal from '../Handbook/HanbookModal';
import ThankYouModal from '../ThankYou/ThankYouModal';

const styles = {
  paperStyle: {
    height: '50%',
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
    margin: 2,
    marginBottom: 3,
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

class WebViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      lightboxIsOpen: false,
      notesModal: false,
      handbookModal: false,
      notesText: '',
      thankYouModal: false,
    };
  }
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


  onChangeNotes = (notesText) => {
    this.setState({
      notesText,
    });
  }
  handleImageLoad = (event) => {
    console.log('Image loaded ', event.target);
  }

  closeNotesModal = () => {
    this.setState({
      notesModal: false,
    });
  };

  submitSurvey = () => {
    this.setState({ thankYouModal: true });
    setTimeout(() => { 
      const tab = window.open(location, '_self', '');
      tab.close();
      this.props.exit();
      window.close();
    }, 10000);
  };

  render() {
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme(lightBaseTheme)}
      >
        <div className="App">
          {!this.state.handbookModal && !this.state.notesModal && !this.state.thankYouModal ?
            <div>
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <p className="App-intro">
               Upload your photos, get directions from handbook
              </p>
              <FlatButton
                backgroundColor={'#9E9E9E'}
                label="Test"
                onTouchTap={this.submitSurvey}
                style={{ margin: 2 }}
              />
              <FlatButton
                backgroundColor={'#9E9E9E'}
                label="Handbook"
                onTouchTap={() => this.setState({ handbookModal: true })}
                style={{ margin: 2 }}
              />
              <FlatButton
                backgroundColor={'#9E9E9E'}
                label="Add Notes"
                onTouchTap={() => this.setState({ notesModal: true })}
                style={{ margin: 2 }}
              />
              <FlatButton
                backgroundColor={'#9E9E9E'}
                label="Add Images"
                labelPosition="before"
                style={styles.uploadButton}
                containerElement="label"
              >
                <input
                  multiple
                  type="file"
                  style={styles.uploadInput}
                  onChange={(img, i) => this.onInputChange(img, i)}
                />
              </FlatButton>
              { this.state.images.length > 0 ?
                <div
                  style={styles.paperStyle}
                >
                  <ImageGallery
                    items={this.state.images}
                    slideInterval={2000}
                    showThumbnails={false}
                    showPlayButton={false}
                    onImageLoad={this.handleImageLoad}
                  />
                  <FlatButton
                    backgroundColor={'#9E9E9E'}
                    label="Submit"
                    fullWidth
                    onTouchTap={this.submitSurvey}
                  />
                  <br />
                </div> : null}
            </div> : null}
          <div>
            <HandbookModal
              isOpen={this.state.handbookModal}
              close={() => this.setState({ handbookModal: false })}
            />
            <NotesModal
              onChangeNotes={this.onChangeNotes}
              isOpen={this.state.notesModal}
              close={this.closeNotesModal}
              notesText={this.state.notesText}
            />
            <ThankYouModal
              isOpen={this.state.thankYouModal}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default WebViewContainer;
