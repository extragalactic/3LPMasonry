import React from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import FlatButton from 'material-ui/FlatButton';
import { filter } from 'lodash';

import PhotoViewerContainer from './PhotoViewerContainer';
import WarningMessage from './WarningMessage';
import LocationMap from '../Maps/LocationMap';

import styleCSS from '../../styles/customerDetailsStyles';


class CustomerDetailsTabs extends React.Component {
	constructor(props) {
  	super(props); 	
 	}	

  renderGoogleMaps() {
		if (this.props.location.lat && this.props.location.lon) { 
			return (
				<LocationMap lat={this.props.location.lat} lon={this.props.location.lon} />
			);
		} else {
				return (
					<div><WarningMessage message='Location coordinates have not been set for this customer.' /> </div>
				);
		}
  }

	render() {
		return (
		  <Tabs>
		    <Tab label="Survey Photos" style={styleCSS.tabsBar} >
					<Row style={styleCSS.photoViewer} >
						<PhotoViewerContainer 
							photos={this.props.photos}  
							photoData={this.props.photoData}
							addSurveyPhoto={this.props.addSurveyPhoto}
						/>
					</Row>				
		    </Tab>		    
		    <Tab label="Location Map" style={styleCSS.tabsBar} >
					<Row style={styleCSS.googleMapsContainer}>
						{this.renderGoogleMaps()}
					</Row>
		    </Tab>	    
		  </Tabs>
		);
	}
}

export default CustomerDetailsTabs;