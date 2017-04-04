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


CustomerDetailsTabs.propTypes = {
		id: React.PropTypes.string.isRequired,
		location: React.PropTypes.object.isRequired,
		photos: React.PropTypes.array.isRequired,
		photoData: React.PropTypes.array.isRequired,
		addSurveyPhoto: React.PropTypes.func.isRequired,
	};

function CustomerDetailsTabs (props) {

  const renderGoogleMaps = function() {
		if (props.location.lat && props.location.lon) { 
			return (
				<LocationMap 
					lat={props.location.lat} 
					lon={props.location.lon} 
					mapWidth={500}
					mapHeight={280}
				/>
			);
		} else {
				return (
					<div><WarningMessage message='Location coordinates have not been set for this customer.' /> </div>
				);
		}
  }

	return (
	  <Tabs>
	    <Tab label="Survey Photos" style={styleCSS.tabsBar} >
				<Row style={styleCSS.photoViewer} >
					<PhotoViewerContainer 
						id={props.id}
						photos={props.photos}  
						photoData={props.photoData}
						addSurveyPhoto={props.addSurveyPhoto}
					/>
				</Row>				
	    </Tab>		    
	    <Tab label="Location Map" style={styleCSS.tabsBar} >
				<Row style={styleCSS.googleMapsContainer}>
					{renderGoogleMaps()}
				</Row>
	    </Tab>	    
	  </Tabs>
	);

}

export default CustomerDetailsTabs;