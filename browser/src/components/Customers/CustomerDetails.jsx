import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import WobblySpinner from 'react-wobbly-spinner';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { CUSTOMER_STATUS, SURVEY_TYPES } from './CustomerDataList';
import PhotoViewer from './PhotoViewer';
import LocationMap from '../Maps/LocationMap';
import AcceptEstimateButton from './AcceptEstimateButton';
import CustomerDetailsTabs from './CustomerDetailsTabs';
import ProjectNotes from './ProjectNotes';

import styleCSS from '../../styles/customerDetailsStyles';
import { getCustomer } from '../../graphql/queries';

'use strict;';

class _CustomerDetails extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
    if (this.props.data.loading) {
      return (
        <WobblySpinner diameter={200} />
      );
    }
    const data = this.props.data.customer;

		// build the array of photos for the PhotoViewer
	 	const photos = data.survey.photos.map(photo => (
   {
     original: photo.photo,
     thumbnail: photo.thumb,
     description: photo.caption,
   }
			));
		// build supplementary data array for photos
	 	const photoData = data.survey.photos.map(photo => (
   {
     title: photo.heading,
     text: photo.description,
     timestamp: photo.timestamp,
   }
			));

    return (
      <div style={styleCSS.detailsPage}>
        <Grid fluid>
          <Row style={styleCSS.statusBar}>
            <div style={styleCSS.statusMessage}> {`STATUS: ${CUSTOMER_STATUS[data.status]} `}</div>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col md={5} lg={5} style={{ padding: 10 }}> {/* start first column */}
              <div style={styleCSS.title}> {`${data.firstName} ${data.lastName}`}<br /></div>
              {data.address}<br /><br />
              <a href={`mailto:${data.email1}`}>{data.email1}</a><br />
              {data.email2 &&
              <div><a href={`mailto:${data.email2}`}>{data.email2}</a><br /></div>
							}
              <br />
              {data.wphone &&
              <div>W: {data.wphone}<br /></div>
							}
              {data.cphone &&
              <div>C: {data.cphone}<br /></div>
							}
              {data.hphone &&
              <div>H: {data.hphone}<br /></div>
							}
              <br />
              <div>{`Survey Type: ${SURVEY_TYPES[0]} `}</div>
              <div>{`Surveyor: ${data.surveyor.firstName} ${data.surveyor.lastName} (mobile: ${data.surveyor.mobile})`}</div>
              {data.estimator !== null &&
              <div>{'Estimator: ...'}</div>
							}
              <br />

              <Row>
                <Col xs={6} md={6} lg={6}>
                  <Row>
                    <div>
                    <FlatButton
                    label="View Estimate PDF"
                    primary
                    target="_blank"
                    href={`https://tlpm.ca/documents/${data.firstName}${data.lastName}Estimate.pdf`}
                  />
                  </div>
                  </Row>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <Row>
                    <div>
                    <AcceptEstimateButton />
                  </div>
                  </Row>
                </Col>
              </Row>

              <Row>
                <ProjectNotes />
              </Row>

            </Col>

            <Col md={7} lg={7} style={{ padding: 10 }}> {/* start second column */}
              <Row>
                <CustomerDetailsTabs
                  location={{ lat: parseFloat(data.coordinates.latitude), lon: parseFloat(data.coordinates.longitude) }}
                  photos={photos}
                  photoData={photoData}
                />
              </Row>
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

const CustomerDetails = compose(
   graphql(getCustomer, { options: ({ id }) => ({ variables: { id } }) }),
 )(_CustomerDetails);

export default CustomerDetails;
