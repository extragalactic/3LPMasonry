import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

LoadingPopup.propTypes = {
  message: PropTypes.string.isRequired,
};

function LoadingPopup(props) {
  return (
    <div>
      <Dialog
        title={props.message}
        modal={false}
        open
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    </div>
  );
}
export default LoadingPopup;
