import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

function ProjectNotes (props) {

	return (
		<div style={styleCSS.projectNotes}>
			<Row>
				<div style={styleCSS.title}>Project Notes</div>
			</Row>	
			<Row>				
				<div>{`View and add/delete general notes.`}</div>
			</Row>	
		</div>
	);

}

export default ProjectNotes;