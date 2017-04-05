import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from "react-wobbly-spinner";
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { CUSTOMER_STATUS } from './CustomerDataList';
import CustomerDetailsTabs from './CustomerDetailsTabs';
import { getCustomer } from '../../graphql/queries';
import { addSurveyPhoto } from '../../graphql/mutations';
import styleCSS from '../../styles/customerDetailsStyles';

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
						<div style={styleCSS.titleName}>{`${data.firstName} ${data.lastName}`}</div>
					</Col>
					<Col>
						<div style={styleCSS.statusMessage}> {`STATUS: ${CUSTOMER_STATUS[data.status]} `}</div>
					</Col> 
				</Row>

				<Row>
					<Col md={12} lg={12} style={{padding:10}}>
							<CustomerDetailsTabs 
								id={props.id}
								data={data}
								photos={photos}
								photoData={photoData}
								addSurveyPhoto={props.addSurveyPhoto}
							/>

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