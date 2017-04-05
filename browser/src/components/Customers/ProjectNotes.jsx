import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

ProjectNotes.propTypes = {
	notes: React.PropTypes.array.isRequired,
};

function ProjectNotes (props) {
	return (
		<div>
				<div style={styleCSS.surveyNotes}>
					<Row>
						<div style={styleCSS.surveyNotesTitle}>Project Notes</div>
					</Row>
					{ props.notes.length === 0 &&
						<Row><div>There are no notes for this project.</div></Row>
					}
					{ props.notes.map( (note)=> {		
						return (
							<Row style={styleCSS.surveyNote}>	
								<Col>
									<Row><div style={styleCSS.surveyNoteTitle}>{note.user.name} says:</div></Row>
									<Row><div>{note.text}</div><br /></Row>
								</Col>
							</Row>
							)
					})}
				</div>
		</div>
	);

}

export default ProjectNotes;