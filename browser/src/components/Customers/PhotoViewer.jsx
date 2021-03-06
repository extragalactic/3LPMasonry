import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { FormatTimestamp } from '../Utils/Utils';

import styleCSS from '../../styles/customerDetailsStyles';
import styles from 'style-loader!css-loader!react-image-gallery/styles/css/image-gallery.css';


class PhotoViewer extends React.Component {
  static propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    photoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      timestamp: '',
    };
    this.onSlide = this.onSlide.bind(this);
    this.updatePhotoDetails = this.updatePhotoDetails.bind(this);
  }

  componentDidMount() {
    this.updatePhotoDetails(0);
  }

  onSlide(index) {
    this.updatePhotoDetails(index);
  }

  updatePhotoDetails(index) {
    this.setState({
      title: this.props.photoData[index].title,
      text: this.props.photoData[index].text,
      timestamp: this.props.photoData[index].timestamp,
    });
  }

  render() {
    return (
      <div>
        <div style={{ width: 550 }}>
          <ImageGallery
            items={this.props.photos}
            slideInterval={2000}
            onSlide={this.onSlide}
            defaultImage="https://s3.ca-central-1.amazonaws.com/tlpm/web/image-not-found.jpg"
            thumbnailPosition={'bottom'}
          />
        </div>
        <br />
        <div>
          <span style={styleCSS.subtitle}>{this.state.title}</span>
        </div>
        <div>
          <span>{this.state.text}</span>
        </div>
        <div>
          <span style={styleCSS.italicData}>{FormatTimestamp(this.state.timestamp)}</span>
        </div>
      </div>
    );
  }
}

export default PhotoViewer;
