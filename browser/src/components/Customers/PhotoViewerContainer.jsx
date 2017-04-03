import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { filter } from 'lodash';
import Divider from 'material-ui/Divider';

import PhotoViewer from './PhotoViewer';
import WarningMessage from './WarningMessage';

import styleCSS from '../../styles/customerDetailsStyles';

class PhotoViewerContainer extends React.Component {
	static propTypes = {	
		id: React.PropTypes.string.isRequired,
		photos: React.PropTypes.array.isRequired,
		photoData: React.PropTypes.array.isRequired,
		addSurveyPhoto: React.PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);	
    this.renderPhotoViewer = this.renderPhotoViewer.bind(this);
	}
 
 	onLoadComplete(index) {
 		console.log('load completed: ' + index);
 	}

  onFileSelected = (e) => {
  	console.log(e.target.files);
  	const fileTypeRegex = /(.jpg|.jpeg|.png|.gif)/g;

    filter(
	      e.target.files,
	      file => file.type.match(fileTypeRegex) !== null
    	)
	    .forEach(
	        (file, index) => {
	          const reader = new FileReader();
	          reader.onload = this.onLoadComplete(index);
	          reader.readAsDataURL(file);
	          setTimeout(() => {
	            this.props.addSurveyPhoto({
	              variables: {
	                heading: 'OnlineEstimateTest',
	                description: 'OnlineEstimateTest',
	                orginalBase64: reader.result,
	                timestamp: new Date(),
	                custid: this.props.id,
	                //user: JSON.parse(localStorage.getItem('profile')).user_id
	                user: 'office_upload',
	              },
	            })
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
				<br />
				<Row style={{marginTop:10, marginBottom:5}}>
					<div style={styleCSS.subtitle}>Upload a New Photo</div>
				</Row>
				<Row>
          <input
            multiple
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            style={styleCSS.uploadInput}
            onChange={this.onFileSelected}
          />
        </Row>	
			</div>		
		);
	}
}

export default PhotoViewerContainer;