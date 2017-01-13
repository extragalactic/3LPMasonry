import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ContentBlock from 'material-ui/svg-icons/content/block';
import UserDetailsForm from '../Forms/reduxUserDetailsForm';

class userAdminPanelComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: {},
    };
  }
  onFormSubmit = (values) => {
    this.props.mutate({ variables: {
      id: this.state.selection._id,
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
      surveyor: values.surveyor,
      estimator: values.estimator,
      office: values.office,
      newCustomers: [],
    } });
    this.forceUpdate();
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  editUser = (id) => {
    let selection = {};
    this.props.data.users.map((user) => {
      if (user._id === id) {
        selection = user;
      }
    });
    this.setState({
      open: true,
      selection: selection,
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={this.handleClose}
      />];

    if (this.props.data.loading) {
      return <LinearProgress mode="indeterminate" />;
    } else {
      return (
        <div>
          <Dialog
            title={'Update User Info'}
            actions={actions}
            modal
            open={this.state.open}
          >
            <UserDetailsForm
              firstName={this.state.selection.firstName}
              lastName={this.state.selection.lastName}
              mobile={this.state.selection.mobile}
              onSubmit={this.onFormSubmit}
              surveyor={this.state.selection.surveyor}
              estimator={this.state.selection.estimator}
              office={this.state.selection.office}
            />
          </Dialog>
          <Table>
            <TableHeader
              enableSelectAll={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Mobile</TableHeaderColumn>
                <TableHeaderColumn>Surveyor</TableHeaderColumn>
                <TableHeaderColumn>Estimator</TableHeaderColumn>
                <TableHeaderColumn>Office</TableHeaderColumn>
                <TableHeaderColumn>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.props.data.users.map((user, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.firstName}</TableRowColumn>
                    <TableRowColumn>{user.lastName}</TableRowColumn>
                    <TableRowColumn>{user.mobile}</TableRowColumn>
                    <TableRowColumn>
                      {user.surveyor ? <ActionCheckCircle /> : <ContentBlock /> }
                    </TableRowColumn>
                    <TableRowColumn>
                      {user.estimator ? <ActionCheckCircle /> : <ContentBlock /> }
                    </TableRowColumn>
                    <TableRowColumn>
                      {user.office ? <ActionCheckCircle /> : <ContentBlock /> }
                    </TableRowColumn>
                    <TableRowColumn>
                      <FlatButton
                        onTouchTap={() => { this.editUser(user._id); }}
                      >
                       Edit
                     </FlatButton>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      );
    }
  }
}

const getAllUsers = gql`
   query {
  users {
    email
    _id
    firstName
    lastName
    mobile
    surveyor
    estimator
    office
  }
}`;

const updateUser = gql `mutation updateCustomer($newCustomers: [newCustomers], $id:String, $firstName:String, $lastName:String, $mobile:String, $estimator: Boolean, $surveyor: Boolean, $office:Boolean){
  updateUser(newCustomers: $newCustomers, id:$id, firstName:$firstName, lastName: $lastName, mobile: $mobile, estimator:$estimator, surveyor: $surveyor, office: $office){
    email
  }
}`;

const userAdminPanelQuery = graphql(getAllUsers)(userAdminPanelComp);

const userAdminPanel = graphql(updateUser)(userAdminPanelQuery);

export default userAdminPanel;
