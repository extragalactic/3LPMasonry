import React from 'react';

import StreetView from './StreetView';

StreetViewContainer.propTypes = {
	params: React.PropTypes.object.isRequired,
};

function StreetViewContainer(props) {
	const custid = props.params.id;

	const style = {
		marginLeft: 12,
		marginBottom: 10,
		marginTop: 5,
	};

	return (
		<div style={style}>
			<StreetView id={custid} />
		</div>
	);
}

export default StreetViewContainer;
