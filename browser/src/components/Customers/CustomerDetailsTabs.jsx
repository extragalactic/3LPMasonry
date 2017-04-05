import React from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import FlatButton from 'material-ui/FlatButton';
import { filter } from 'lodash';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

import PhotoViewerContainer from './PhotoViewerContainer';
import WarningMessage from './WarningMessage';
import LocationMap from '../Maps/LocationMap';
import AcceptEstimateButton from './AcceptEstimateButton';
import ProjectNotes from './ProjectNotes';
import SurveyNotes from './SurveyNotes';
import { SURVEY_TYPES } from './CustomerDataList';
import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

CustomerDetailsTabs.propTypes = {
	id: React.PropTypes.string.isRequired,
	data: React.PropTypes.object.isRequired,
	photos: React.PropTypes.array.isRequired,
	photoData: React.PropTypes.array.isRequired,
	addSurveyPhoto: React.PropTypes.func.isRequired,
};

function CustomerDetailsTabs (props) {

  const renderGoogleMaps = function() {
		if (props.data.coordinates.latitude && props.data.coordinates.longitude) { 
			return (
				<LocationMap 
					lat={parseFloat(props.data.coordinates.latitude)} 
					lon={parseFloat(props.data.coordinates.longitude)} 
					mapWidth={550}
					mapHeight={280}
				/>
			);
		} else {
				return (
					<div><WarningMessage message='Location coordinates have not been set for this customer.' /> </div>
				);
		}
  }
  const data = props.data;

	return (

	  <Tabs>
	    <Tab label="Customer Data" style={styleCSS.tabsBar}>
	    	<Row>
				<Col md={5} lg={5} style={{padding:10}}> 
					<div style={styleCSS.title}> {`${data.firstName} ${data.lastName}`}<br/></div>
					{data.address}<br/><br/>
					<a href={"mailto:" + data.email1}>{data.email1}</a><br/>
					{data.email2 && 
					  <div><a href={"mailto:" + data.email2}>{data.email2}</a><br/></div>
					} 
					<br/>
					{data.wphone && 
						<div>W: {data.wphone}<br/></div>
					}
					{data.cphone && 
						<div>C: {data.cphone}<br/></div>
					}
					{data.hphone && 
						<div>H: {data.hphone}<br/></div>
					}	
					<br/>
					<div>{`Survey Type: ${SURVEY_TYPES[0]} `}</div>
					<div>{`Surveyor: ${data.surveyor.firstName} ${data.surveyor.lastName} (mobile: ${data.surveyor.mobile})`}</div>
					{data.estimator!==null  && 
						<div>{`Estimator: ...`}</div>
					}
					<br/>

					{(data.estimatePDF && data.estimatePDF.length>0) && 
						<Row>
							<Col xs={6} md={6} lg={6}>
								<Row>
									<div>
										<FlatButton 
											label="View Estimate PDF" 
											primary={true} 
											target="_blank"
   										href={data.estimatePDF}
   									/>
									</div>
								</Row>
							</Col>
							<Col xs={6} md={6} lg={6}>
								<Row>								
									<div>
										<AcceptEstimateButton />
									</div>
									<br />
								</Row>										
							</Col>
						</Row>
					}
					<Row>
						<ProjectNotes notes={data.notes}/>
					</Row>
				</Col>

	    	<Col md={7} lg={7}>
					<Row style={styleCSS.googleMapsContainer}>
						{renderGoogleMaps()}
					</Row>
				</Col>
				</Row>
	    </Tab>	

	    <Tab label="Survey Photos & Notes"  style={styleCSS.tabsBar}>
	    	<Row>
	    		<Col md={5} lg={5} style={{padding:10}}>
						<Row style={{width:500}}>
							<SurveyNotes notes={data.survey.notes}/>
						</Row>	    		
	    		</Col>
	    		<Col md={7} lg={7}>
						<Row style={styleCSS.photoViewer}>
							<PhotoViewerContainer 
								id={props.id}
								photos={props.photos}  
								photoData={props.photoData}
								addSurveyPhoto={props.addSurveyPhoto}
							/>
						</Row>
					</Col>
				</Row>
	    </Tab>	
	    <Tab label="Estimates"  style={styleCSS.tabsBar}>

	    </Tab>	    

	  </Tabs>
	);
}

export default CustomerDetailsTabs;