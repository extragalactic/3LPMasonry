import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from "react-wobbly-spinner";
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Paper from 'material-ui/Paper';

import { CUSTOMER_STATUS } from './CustomerDataList';
import CustomerDetailsTabs from './CustomerDetailsTabs';
import { getCustomer } from '../../graphql/queries';
import { addSurveyPhoto } from '../../graphql/mutations';
import styleCSS from '../../styles/customerDetailsStyles';


_CustomerDetails.propTypes = {
	id: React.PropTypes.string.isRequired
};

function _CustomerDetails (props) {

  const onBackClick = function() { 
    browserHistory.push('customers'); 
  }

  if (props.data.loading) {
    return (
			<div style={styleCSS.spinnerInset}>
      	<WobblySpinner diameter={200} />
			</div>
    );
  }
	const data = props.data.customer;

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
						<Paper style={styleCSS.paperStyleSmall} zDepth={1}>
							<div style={styleCSS.titleName}>{`${data.firstName} ${data.lastName}`}</div>
						</Paper>
					</Col>
					<Col>
						{CUSTOMER_STATUS[data.status] 
							? <div style={styleCSS.statusMessage}> {`status: ${CUSTOMER_STATUS[data.status]} `}</div>
							: <div style={styleCSS.statusMessage}> (no status)</div>
						}
					</Col> 
				</Row>

				<Row>
					<Col md={12} lg={12} style={{padding:10}}>
							<CustomerDetailsTabs 
								custid={props.id}
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