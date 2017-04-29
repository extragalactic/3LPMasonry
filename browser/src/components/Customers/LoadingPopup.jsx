import React from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

class LoadingPopup extends React.Component {
  static propTypes = {
    message: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <Dialog
          title={this.props.message}
          modal={false}
          open
        >
          <LinearProgress mode="indeterminate" />
        </Dialog>
      </div>
    );
  }
}
export default LoadingPopup;
