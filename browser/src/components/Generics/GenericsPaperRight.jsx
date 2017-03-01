import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { PaperStyles } from '../../styles/mainStyles';

const GenericsPaperRight = ({ heading, bulletpoints, paragraph, submitGeneric, warranty }) => (
  <Paper
    style={PaperStyles.generics.right}
  >
    <div>
      <h3> {heading} </h3>
      { bulletpoints.map(bullet => <li>{bullet}</li>)}
      {paragraph.map(p => <p>{p}</p>)}
      {warranty}
    </div>
    <FlatButton
      label={'submit'}
      onTouchTap={submitGeneric}
    />
  </Paper>
);

export default GenericsPaperRight;

