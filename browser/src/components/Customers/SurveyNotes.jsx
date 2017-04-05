import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

SurveyNotes.propTypes = {
	notes: React.PropTypes.array.isRequired,
};

function SurveyNotes (props) {
	return (
		<div>
				<div style={styleCSS.surveyNotes}>
					<Row>
						<div style={styleCSS.surveyNotesTitle}>Survey Notes</div>
					</Row>
					{ props.notes.length === 0 &&
						<Row><div>There are no notes for this survey.</div></Row>
					}
					{ props.notes.map( (note)=> {		
						return (
							<Row style={styleCSS.surveyNote}>	
								<Col>
									<Row><div style={styleCSS.surveyNoteTitle}>{note.user} says:</div></Row>
									<Row><div style={styleCSS.surveyNoteTimestamp}>({note.timestamp})</div></Row>
									<Row><div>{note.text}</div></Row>
								</Col>
							</Row>
							)
					})}
				</div>
		</div>
	);

}

export default SurveyNotes;