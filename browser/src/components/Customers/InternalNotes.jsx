import React from 'react';
import { graphql, compose } from 'react-apollo';
import { addNotes, deleteNotes } from '../../graphql/mutations';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import NoteItem from './NoteItem';
import AddNewNote from './AddNewNote';
import styleCSS from '../../styles/customerDetailsStyles';


_InternalNotes.propTypes = {
	id: React.PropTypes.string.isRequired,
	notes: React.PropTypes.array.isRequired,
};

function _InternalNotes (props) {
	return (
		<div>
				<div style={styleCSS.surveyNotes}>
					<Row>
						<div style={styleCSS.surveyNotesTitle}>Internal Notes</div>
					</Row>
					{ props.notes.length === 0 &&
						<Row><div>There are no notes for this project.</div></Row>
					}
					{ props.notes.map( (note, index)=> {		
						return (
							<Row style={styleCSS.surveyNote} key={note._id}>	
								<Col>
									<NoteItem note={note} deleteNote={props.deleteNotes} index={index} style={{width:'100%'}}/>
								</Col>
							</Row>
							)
					})}
					<Row>
						<AddNewNote submitNewNote={props.addNotes} id={props.id}/>
					</Row>
				</div>
		</div>
	);
}

const InternalNotes = compose(
  graphql( addNotes, { name: 'addNotes' } ),
  graphql( deleteNotes, { name: 'deleteNotes' } )	
 )( _InternalNotes );

export default InternalNotes;