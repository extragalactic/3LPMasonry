import React from 'react';

import StreetView from './StreetView';

function StreetViewContainer (props) {

	const custid = props.params.id;

	return (
		<div>
			<StreetView id={custid} />
		</div>
	);
}

export default StreetViewContainer;