import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

"use strict;"

SurveyNotesList.propTypes = {
	notes: React.PropTypes.array.isRequired,
};

function SurveyNotesList (props) {
	return (
		<div>
				<div style={styleCSS.surveyNotesList}>
					<Row>
						<div style={styleCSS.surveyNotesListTitle}>Survey Notes</div>
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
								<Row><div>{note.text}</div><br /></Row>
								</Col>
							</Row>
							)
					})}
				</div>
		</div>
	);

}

export default SurveyNotesList;