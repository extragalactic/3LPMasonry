import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import PhotoViewerContainer from './PhotoViewerContainer';
import WarningMessage from '../Utils/WarningMessage';
import LocationMap from '../Maps/LocationMap';
import AcceptEstimateButton from './AcceptEstimateButton';
import DispatchSurveyor from './DispatchSurveyor';
import InternalNotes from './InternalNotes';
import SurveyNotes from './SurveyNotes';
import { FormatPhoneNumber } from '../Utils/Utils';
import { SURVEY_TYPES } from './CustomerDataList';
import styleCSS from '../../styles/customerDetailsStyles';


CustomerDetailsTabs.propTypes = {
  custid: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  photoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  addSurveyPhoto: PropTypes.func.isRequired,
  dispatchCustomer: PropTypes.func.isRequired,
};

function CustomerDetailsTabs(props) {
  const renderGoogleMaps = function () {
    if (props.data.coordinates.latitude && props.data.coordinates.longitude) {
      return (
        <LocationMap
          lat={parseFloat(props.data.coordinates.latitude)}
          lon={parseFloat(props.data.coordinates.longitude)}
          mapWidth={550}
          mapHeight={280}
        />
      );
    }
    return (
      <div><WarningMessage message="Location coordinates have not been set for this customer." /> </div>
    );
  };
  const data = props.data;
  const isSurveyorSelected = data.surveyor.firstName && data.surveyor.firstName !== '';

  return (
    <Tabs>
      {/* ------------ CUSTOMER DATA ------------ */}
      <Tab label="Customer Data" style={styleCSS.tabsBar}>
        <Row>
          <Col md={5} lg={5} style={{ padding: 10 }}>
            <Paper style={styleCSS.paperStyleLarge} zDepth={2}>
              <div style={styleCSS.title}> {`${data.firstName} ${data.lastName}`}<br /></div>
              {data.address}<br /><br />
              <a href={`mailto:${data.email1}`}>{data.email1}</a><br />
              {data.email2 &&
                <div><a href={`mailto:${data.email2}`}>{data.email2}</a><br /></div>
              }
              <br />
              {data.wphone &&
                <div>W: {FormatPhoneNumber(data.wphone)}<br /></div>
              }
              {data.cphone &&
                <div>C: {FormatPhoneNumber(data.cphone)}<br /></div>
              }
              {data.hphone &&
                <div>H: {FormatPhoneNumber(data.hphone)}<br /></div>
              }
              <br />
              <div>{`Surveyor: ${data.surveyor.firstName ? data.surveyor.firstName : 'None assigned'} ${data.surveyor.lastName ? data.surveyor.lastName : ''}`}</div>
              { isSurveyorSelected &&
                <div>
                  <div>{`Surveyor Mobile #: ${FormatPhoneNumber(data.surveyor.mobile)}`}</div>
                </div>
              }
              <div>{`Survey Type: ${data.surveyType ? SURVEY_TYPES[data.surveyType] : SURVEY_TYPES[2]}`}</div>
              <DispatchSurveyor
                custid={props.custid}
                dispatchCustomer={props.dispatchCustomer}
                initialSurveyor={`${data.surveyor.firstName} ${data.surveyor.lastName}`}
                title={isSurveyorSelected ? 'Change Surveyor' : 'Dispatch Surveyor'}
              />
              <div>{`Estimator: ${data.estimator !== null ? data.estimator : 'None assigned'}`}</div>
              <br />
            </Paper>
            <br />
            <Paper style={styleCSS.paperStyleLarge} zDepth={2}>
              <Row>
                <InternalNotes notes={data.notes} custid={props.custid} />
              </Row>
            </Paper>
          </Col>
          <Col md={7} lg={7}>
            <Row style={styleCSS.googleMapsContainer}>
              {renderGoogleMaps()}
            </Row>
          </Col>
        </Row>
      </Tab>
      {/* ------------ SURVEY PHOTOS & NOTES ------------ */}
      <Tab label="Survey Photos & Notes" style={styleCSS.tabsBar}>
        <Row>
          <Col md={5} lg={5} style={{ padding: 10 }}>
            <Paper style={styleCSS.paperStyleLarge} zDepth={2}>
              <Row style={{ width: '100%' }}>
                <SurveyNotes notes={data.survey.notes} />
              </Row>
            </Paper>
          </Col>
          <Col md={7} lg={7}>
            <Row style={styleCSS.photoViewer}>
              <PhotoViewerContainer
                custid={props.custid}
                photos={props.photos}
                photoData={props.photoData}
                addSurveyPhoto={props.addSurveyPhoto}
              />
            </Row>
          </Col>
        </Row>
      </Tab>
      {/* ------------ ESTIMATES ------------ */}
      <Tab label="Estimates" style={styleCSS.tabsBar}>
        <div style={{ marginTop: 10 }}>
          <Paper style={styleCSS.paperStyleLarge} zDepth={2}>
            {(data.estimatePDF && data.estimatePDF.length > 0) ?
              <Row>
                <Col xs={5} md={5} lg={5} />
                <Col xs={7} md={7} lg={7}>
                  <Row>
                    <div>
                      <FlatButton
                        label="View Estimate PDF"
                        primary
                        target="_blank"
                        href={data.estimatePDF}
                      />
                    </div>
                  </Row>
                  <Row>
                    <div>
                      <AcceptEstimateButton />
                    </div>
                    <br />
                  </Row>
                </Col>
              </Row>
              : <div><WarningMessage message="This customer does not have an estimate yet." /></div>
            }
          </Paper>
        </div>
      </Tab>
    </Tabs>
  );
}

export default CustomerDetailsTabs;
