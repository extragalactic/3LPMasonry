import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from "react-wobbly-spinner";
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { CUSTOMER_STATUS, SURVEY_TYPES } from './CustomerDataList';
import PhotoViewer from './PhotoViewer';
import LocationMap from '../Maps/LocationMap';
import AcceptEstimateButton from './AcceptEstimateButton';
import CustomerDetailsTabs from './CustomerDetailsTabs';
import ProjectNotes from './ProjectNotes';

import styleCSS from '../../styles/customerDetailsStyles';
import { getCustomer } from '../../graphql/queries';
import { addSurveyPhoto } from '../../graphql/mutations';

"use strict;"


_CustomerDetails.propTypes = {
	id: React.PropTypes.string.isRequired
};

function _CustomerDetails (props) {

  const onBackClick = function() { 
    browserHistory.push('customers'); 
  }

  if (props.data.loading) {
    return (
      <WobblySpinner diameter={200} />
    );
  }
	const data = props.data.customer;
	console.log('Customer ID: ' + props.data.customer.id);

	// build the array of photos for the PhotoViewer
 	const photos = data.survey.photos.map(photo => {
		return (
			{
				original: photo.photo,
				thumbnail: photo.thumb,
				description: photo.caption
			}
		);
	});

	// build supplementary data array for photos
 	const photoData = data.survey.photos.map(photo => {
		return (
			{
				title: photo.heading,
				text: photo.description,
				timestamp: photo.timestamp
			}
		);
	});

	return (
		<div style={styleCSS.detailsPage}>
			<Grid fluid>
				<Row style={styleCSS.statusBar}>
					<Col>
						<IconButton 
							tooltip="Back to customers list" 
							tooltipPosition="top-right" 
							tooltipStyles={{fontSize: 16, color:"#fff"}}
							onClick={onBackClick}
						>
								<ArrowBackIcon color={"#000"} hoverColor={"#0f0"}/>
							</IconButton>
						</Col>
						<Col>
						<div style={styleCSS.statusMessage}> {`STATUS: ${CUSTOMER_STATUS[data.status]} `}</div>
					</Col> 
				</Row>

				
				<Row style={{marginTop:10}}>
					<Col md={5} lg={5} style={{padding:10}}> {/* start first column */}
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
							<ProjectNotes />
						</Row>

					</Col>

					<Col md={7} lg={7} style={{padding:10}}> {/* start second column */}
						<Row>
							<CustomerDetailsTabs 
								id={props.id}
								location={ {lat: parseFloat(data.coordinates.latitude), lon: parseFloat(data.coordinates.longitude)} } 
								photos={photos}
								photoData={photoData}
								addSurveyPhoto={props.addSurveyPhoto}
							/>
						</Row>
					</Col>

				</Row>
			</Grid>
		</div>
	)

}

const CustomerDetails = compose(
   graphql( getCustomer, { options: ({ id }) => ({ variables: { id: id }, pollInterval: 1000}) } ),	
   graphql( addSurveyPhoto, { name: 'addSurveyPhoto' }),
 )( _CustomerDetails );

export default CustomerDetails;