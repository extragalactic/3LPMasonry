import React from 'react';
import PropTypes from 'prop-types';

/* global google */

class LocationMap extends React.Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    mapWidth: PropTypes.number.isRequired,
    mapHeight: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {
        lat: this.props.lat,
        lng: this.props.lon,
      },
      mapTypeId: 'hybrid',
      fullscreenControl: true,
    });
    const panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
      position: {
        lat: this.props.lat,
        lng: this.props.lon,
      },
      pov: {
        heading: 34,
        pitch: 10,
      },
      fullscreenControl: true,
    });
    map.setStreetView(panorama);
  }

  render() {
    return (
      <div>
        <div>
          <div id="map" style={{ width: this.props.mapWidth, height: this.props.mapHeight }} />
          <br />
        </div>
        <div>
          <div id="pano" style={{ width: this.props.mapWidth, height: this.props.mapHeight }} />
        </div>
      </div>
    );
  }
}

export default LocationMap;
