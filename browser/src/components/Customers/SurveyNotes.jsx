import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

function SurveyNotes (props) {

	return (
		<div style={styleCSS.projectNotes}>
			<Row>
				<div style={styleCSS.title}>Survey Notes</div>
			</Row>	
			<Row>				
				<div>{`View survey notes.`}</div>
			</Row>	
		</div>
	);

}

export default SurveyNotes;