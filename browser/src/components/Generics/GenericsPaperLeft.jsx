import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


import { PaperStyles } from '../../styles/mainStyles';

const GenericsPaperLeft = ({
  setHeading,
  setBulletItem,
  addBulletItemtoList,
  setParagraph,
  bulletitem,
  heading,
  paragraphitem,
  addParagraphtoList,
  setWarranty,
  warranty,
  }) => (
    <Paper
      style={PaperStyles.generics.left}
    >
    <div>
      <TextField
        floatingLabelText="Heading"
        onChange={(event, value) => setHeading(value)}
        fullWidth
        value={heading}
      />
      <br />
      <br />
      <TextField
        floatingLabelText="Paragraph"
        onChange={(event, value) => setParagraph(value)}
        multiLine
        rows={4}
        fullWidth
        value={paragraphitem}
      />
      <FlatButton
        label="Add"
        primary
        onTouchTap={addParagraphtoList}
      />
      <br />
      <TextField
        floatingLabelText="Bullet List"
        onChange={(event, value) => setBulletItem(value)}
        fullWidth
        value={bulletitem}
      />
      <FlatButton
        label="Add"
        primary
        onTouchTap={addBulletItemtoList}
      />

      <TextField
        floatingLabelText="Warranty"
        onChange={(event, value) => setWarranty(value)}
        fullWidth
        value={warranty}
      />

    </div>
  </Paper>
);

export default GenericsPaperLeft;
