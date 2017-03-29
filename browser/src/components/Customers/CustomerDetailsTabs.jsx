import React from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Grid, Row, Col } from 'react-flexbox-grid';

import PhotoViewer from './PhotoViewer';
import LocationMap from '../Maps/LocationMap';

import styleCSS from '../../styles/customerDetailsStyles';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class CustomerDetailsTabs extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <Tabs>
        <Tab label="Survey Photos" style={styleCSS.tabsBar} >
          <Row style={styleCSS.photoViewer} >
            <PhotoViewer
              photos={this.props.photos}
              photoData={this.props.photoData}
            />
          </Row>
        </Tab>
        <Tab label="Notes" style={styleCSS.tabsBar} >
		    	Notes go here
		    </Tab>
        <Tab label="Location Map" style={styleCSS.tabsBar} >
          <Row style={styleCSS.googleMapsContainer}>
            <LocationMap lat={this.props.location.lat} lon={this.props.location.lon} />
          </Row>
        </Tab>
      </Tabs>
    );
  }
}

export default CustomerDetailsTabs;
