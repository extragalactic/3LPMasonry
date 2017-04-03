import React from 'react';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

class LocationMap extends React.Component {
	static propTypes = {
		lat: React.PropTypes.number.isRequired,
		lon: React.PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 16,
			center: {
				lat: this.props.lat,
				lng: this.props.lon
			},
			fullscreenControl: true
		});
		const panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), {
			position: {
				lat: this.props.lat,
				lng: this.props.lon
			},
			pov: {
				heading: 34,
				pitch: 10
			}
		});
		map.setStreetView(panorama);
	}

	render() {
		return (
			<div>
				<div id="map"  style={styleCSS.googleMap} />
				<br/>
				<div id="pano"  style={styleCSS.googleMap} />
			</div>
		)
	}
}

export default LocationMap;