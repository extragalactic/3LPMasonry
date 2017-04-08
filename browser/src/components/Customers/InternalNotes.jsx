import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';

import NoteItem from './NoteItem';
import AddNewNote from './AddNewNote';
import styleCSS from '../../styles/customerDetailsStyles';


InternalNotes.propTypes = {
	notes: React.PropTypes.array.isRequired,
};

function InternalNotes (props) {
	return (
		<div>
				<div style={styleCSS.surveyNotes}>
					<Row>
						<div style={styleCSS.surveyNotesTitle}>Internal Notes</div>
					</Row>
					{ props.notes.length === 0 &&
						<Row><div>There are no notes for this project.</div></Row>
					}
					{ props.notes.map( (note)=> {		
						return (
							<Row style={styleCSS.surveyNote} key={note._id}>	
								<Col>
									<NoteItem note={note}/>
								</Col>
							</Row>
							)
					})}
					<Row>
						<AddNewNote />
					</Row>
				</div>
		</div>
	);
}

export default InternalNotes;