import React from 'react';
import { graphql, compose } from 'react-apollo';
import Dimensions from 'react-dimensions';
import { Row, Col } from 'react-flexbox-grid';

import WarningMessage from '../Utils/WarningMessage';
import { getCustomer } from '../../graphql/queries';


class _StreetView extends React.Component {
	static propTypes = {
		id: React.PropTypes.string.isRequired,
		data: React.PropTypes.object.isRequired,
		containerWidth: React.PropTypes.number.isRequired,
		containerHeight: React.PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props);
		this.panorama = {};
	}

	componentDidMount() {
		this.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
			pov: {
				heading: 34,
				pitch: 10,
			},
			fullscreenControl: true,
		});
	}

	componentDidUpdate() {
		google.maps.event.trigger(this.panorama,'resize');
	}

	render() {
		if (this.props.data.loading) {
			return (
				<Row style={{ marginTop: 15 }}>
					<Col xs={12}>
						<Row center="xs">
							<Col xs={6}>
								<div>
									<div id="pano" />
									{ /* <WobblySpinner diameter={200} /> */ }
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			);
		}

		let latlng = {};
		if (this.props.data.customer) {
			const lat = this.props.data.customer.coordinates.latitude;
			const lon = this.props.data.customer.coordinates.longitude;
			latlng = new google.maps.LatLng(lat, lon);
		} else if (this.props.data.customer && (!this.props.data.customer.coordinates || !this.props.data.customer.coordinates.latitude || !this.props.data.customer.coordinates.longitude)) {
			return (
				<div><WarningMessage message="This customer does not have any location coordinates." /></div>
			);
		} else {
			return (
				<div><WarningMessage message="This customer cannot be found. Either it has been deleted, or the supplied ID is incorrect." /></div>
			);
		}
		this.panorama.setPosition(latlng);

		// sizing info from Dimensions
		const { containerWidth, containerHeight } = this.props;

		return (
			<Row><Col>
				<Row><Col>
					<div>
						<div id="pano" style={{ width: containerWidth, height: containerHeight }} />
					</div>
				</Col></Row>
			</Col></Row>
		);
	}
}


const StreetView = compose(
	graphql(getCustomer, { options: ({ id }) => ({ variables: { id }, pollInterval: 2000 }) }),
 )(_StreetView);

module.exports = Dimensions({
	getHeight: function (element) {
		const heightOffset = 20;
		return window.innerHeight - heightOffset;
	},
	getWidth: function (element) {
		const widthOffset = 10;
		return window.innerWidth - widthOffset;
	},
})(StreetView);
