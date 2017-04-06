import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { graphql, compose } from 'react-apollo';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

function Estimates (props) {
	return (
		<div>
			Estimates
		</div>
	);

}
/*
const Estimates = compose(
   graphql( getFinishedSurvey, { options: ({ id }) => ({ variables: { id: id }, pollInterval: 1000}) } )
 )( _Estimates );
*/
export default Estimates;