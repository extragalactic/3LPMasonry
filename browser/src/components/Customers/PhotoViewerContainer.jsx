import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';
import { filter } from 'lodash';
import Paper from 'material-ui/Paper';

import PhotoViewer from './PhotoViewer';
import WarningMessage from '../Utils/WarningMessage';
import LoadingPopup from './LoadingPopup';

import styleCSS from '../../styles/customerDetailsStyles';


class PhotoViewerContainer extends React.Component {
  static propTypes = {
    custid: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    photoData: PropTypes.arrayOf(PropTypes.object).isRequired,
    addSurveyPhoto: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderPhotoViewer = this.renderPhotoViewer.bind(this);

    this.state = {
      isLoading: false,
      numFilesToLoad: 0,
    };
  }

  onLoadComplete() {
    let isLoading = this.state.isLoading;
    let numFilesToLoad = this.state.numFilesToLoad;

    numFilesToLoad -= 1;
    if (numFilesToLoad <= 0) {
      isLoading = false;
    }
    this.setState({
      isLoading,
      numFilesToLoad,
    });
  }

  onFileSelected = (e) => {
    if (e.target.files.length === 0) {
      return;
    }

    this.setState({
      isLoading: true,
      numFilesToLoad: e.target.files.length,
    });

    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const userID = userProfile && userProfile.user_id ? userProfile.user_id : 'office_upload';

    const fileTypeRegex = /(.jpg|.jpeg|.png|.gif)/g;

    filter(
        e.target.files,
        file => file.type.match(fileTypeRegex) !== null,
      )
      .forEach(
          (file /* ,index */) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setTimeout(() => {
              this.props.addSurveyPhoto({
                variables: {
                  heading: 'OnlineEstimateTest',
                  description: 'OnlineEstimateTest',
                  orginalBase64: reader.result,
                  timestamp: new Date(),
                  custid: this.props.custid,
                  user: userID,
                },
              }).then(() => {
                this.onLoadComplete();
              }).catch(() => {
                this.setState({
                  isLoading: false,
                  numFilesToLoad: 0,
                });
              });
            }, 1000);
          },
      );
  }

  renderPhotoViewer() {
    if (this.props.photos && this.props.photos.length > 0) {
      return (
        <div>
          <PhotoViewer
            photos={this.props.photos}
            photoData={this.props.photoData}
          />
        </div>
      );
    }
    return (
      <div><WarningMessage message="There are no survey photos for this customer." /> </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPhotoViewer()}
        <br />
        <div style={{ width: 340 }}>
          <Paper style={styleCSS.paperStyleLarge} zDepth={2}>
            <Row style={{ marginLeft: 15, marginTop: 10, marginBottom: 5 }}>
              <div style={styleCSS.subtitle}>Upload a New Photo</div>
            </Row>
            <Row style={{ marginLeft: 15 }}>
              <input
                multiple
                type="file"
                size="160"
                accept=".jpg, .jpeg, .png, .gif"
                style={styleCSS.uploadInput}
                onChange={this.onFileSelected}
              />
            </Row>
            <br />
          </Paper>
        </div>
        {this.state.isLoading &&
        <LoadingPopup message="Uploading images to server..." />
        }
      </div>
    );
  }
}

export default PhotoViewerContainer;
