import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import styleCSS from '../../styles/customerDetailsStyles';

class ProjectNotes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <div style={styleCSS.title}>Project Notes</div>
        </Row>
        <Row>
          <div>{'View and add/delete notes...'}</div>
        </Row>
      </div>
    );
  }
}

export default ProjectNotes;
