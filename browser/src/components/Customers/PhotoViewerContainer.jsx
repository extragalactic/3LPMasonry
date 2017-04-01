import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { filter } from 'lodash';

import PhotoViewer from './PhotoViewer';
import WarningMessage from './WarningMessage';

import styleCSS from '../../styles/customerDetailsStyles';

class PhotoViewerContainer extends React.Component {
	constructor(props) {
		super(props);	
    this.renderPhotoViewer = this.renderPhotoViewer.bind(this);
	}
 
  onFileSelected = (e) => {
    filter(
	      e.target.files,
	      file => file.type.match(this.props.fileTypeRegex) !== null, // Note: need fileTypeRegex 
    	)
	    .forEach(
	        (file) => {
	          const reader = new FileReader();
	          reader.onload = this.props.onFileLoad;
	          reader.readAsDataURL(file);
	          setTimeout(() => {
	            //this.state.images.push({ original: reader.result });
	            this.props.addSurveyPhoto({
	              variables: {
	                heading: 'OnlineEstimateTest',
	                description: 'OnlineEstimateTest',
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
		} else {
				return (
					<div><WarningMessage message='There are no survey photos for this customer.' /> </div>					
				);
		} 
  }

	render() {
		return (
			<div>
				{this.renderPhotoViewer()}
				<Row style={{marginTop:10, marginBottom:5}}>
					<div style={styleCSS.subtitle}>Upload a New Photo</div>
				</Row>
				<Row>
          <input
            multiple
            type="file"
            style={styleCSS.uploadInput}
            onChange={(img, i) => this.onFileSelected(img, i)}
          />
        </Row>	
			</div>		
		);
	}
}

export default PhotoViewerContainer;