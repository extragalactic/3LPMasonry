import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

SurveyNotes.propTypes = {
  notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

function SurveyNotes(props) {
  return (
    <div>
      <div style={styleCSS.surveyNotes}>
        <Row>
          <div style={styleCSS.surveyNotesTitle}>Survey Notes</div>
        </Row>
        { props.notes.length === 0 &&
          <Row><div>There are no notes for this survey.</div></Row>
        }
        { props.notes.map((note) => {
          return (
            <Row style={styleCSS.surveyNote} key={note.timestamp}>
              <Col>
                <Row><div style={styleCSS.surveyNoteTitle}>{note.user} says:</div></Row>
                <Row><div style={styleCSS.surveyNoteTimestamp}>({note.timestamp.slice(0, note.timestamp.indexOf('T'))})</div></Row>
                <Row><span style={styleCSS.surveyNoteText}> {`${note.heading.toLowerCase()}: ${note.text}`}</span></Row>
              </Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
}

export default SurveyNotes;
