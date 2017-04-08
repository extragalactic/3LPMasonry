import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';


NoteItem.propTypes = {
	note: React.PropTypes.object.isRequired,
};

function NoteItem (props) {
	const note = props.note;

	return (
		<div>
			<Row><div style={styleCSS.surveyNoteTitle}>{note.user.name} says:</div></Row>
			<Row><div>{note.text}</div><br /></Row>
		</div>
	);

}

export default NoteItem;