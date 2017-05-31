import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Row, Col } from 'react-flexbox-grid';

import NoteItem from './NoteItem';
import AddNewNote from './AddNewNote';
import styleCSS from '../../styles/customerDetailsStyles';
import { addNotes, deleteNotes } from '../../graphql/mutations';

_InternalNotes.propTypes = {
  custid: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNotes: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
};

function _InternalNotes(props) {
  return (
    <div>
      <div style={styleCSS.surveyNotes}>
        <Row>
          <div style={styleCSS.surveyNotesTitle}>Internal Notes</div>
        </Row>
        { props.notes.length === 0 &&
          <Row><div>There are no notes for this project.</div></Row>
        }
        { props.notes.filter(note => (note.text && note.text !== ''))
          .map((note, index) => {
            return (
              <Row style={styleCSS.surveyNote} key={note._id}>
                <Col>
                  <NoteItem note={note} custid={props.custid} deleteNote={props.deleteNotes} index={index} style={{ width: '100%' }} />
                </Col>
              </Row>
            );
          })
        }
        <Row>
          <AddNewNote submitNewNote={props.addNotes} custid={props.custid} />
        </Row>
      </div>
    </div>
  );
}

const InternalNotes = compose(
  graphql(addNotes, { name: 'addNotes' }),
  graphql(deleteNotes, { name: 'deleteNotes' }),
 )(_InternalNotes);

export default InternalNotes;
