import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Estimates from './Estimates';
import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

function EstimatesContainer (props) {
	return (
		<div>
			<Estimates />
		</div>
	);

}

export default EstimatesContainer;