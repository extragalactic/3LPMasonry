import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { getUsers } from '../../graphql/queries';

import styleCSS from '../../styles/customerDetailsStyles';

class _DispatchSurveyor extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    custid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    initialSurveyor: PropTypes.string.isRequired,
    dispatchCustomer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.surveyorList = [];

    this.state = {
      open: false,
      selectedIndex: 0,
    };
  }

  onOpen = () => {
    this.surveyorList = this.props.data.users.filter((user) => { return user.surveyor; });
    let initialIndex = this.surveyorList.findIndex((surveyor) => {
      return this.props.initialSurveyor === `${surveyor.firstName} ${surveyor.lastName}`;
    });
    if (initialIndex === -1) initialIndex = 0;

    this.setState({
      open: true,
      selectedIndex: initialIndex,
    });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  onSelect = (event, index, value) => {
    this.setState({
      selectedIndex: value,
    });
  }

  onSubmit = () => {
    this.props.dispatchCustomer({
      variables: {
        custid: this.props.custid,
        userid: this.surveyorList[this.state.selectedIndex]._id,
      },
    })
    .then(() => {
      console.log('saved!');
      this.setState({ open: false });
    })
    .catch(() => {
      console.log('error saving');
      this.setState({ open: false });
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.onClose}
      />,
      <FlatButton
        label="Select"
        primary
        onTouchTap={this.onSubmit}
      />,
    ];
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };

    if (this.props.data.loading) {
      return (
        <div />
      );
    }

    return (
      <div>
        <FlatButton label={this.props.title} primary onTouchTap={this.onOpen} />
        <Dialog
          style={styleCSS.newNoteDialog}
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.onClose}
        >
          Please select a surveyor from the list:<br />
          <DropDownMenu
            value={this.state.selectedIndex}
            onChange={this.onSelect}
          >
            { this.surveyorList.map((user, index) => {
              return (
                <MenuItem
                  key={user._id}
                  value={index}
                  primaryText={`${user.firstName} ${user.lastName}`}
                />
              );
            })}
          </DropDownMenu>
        </Dialog>
      </div>
    );
  }
}

const DispatchSurveyor = compose(
  graphql(getUsers),
 )(_DispatchSurveyor);

export default DispatchSurveyor;
