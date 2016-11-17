import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { grey800, grey500, grey50 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import Geosuggest from 'react-geosuggest';
import SubmitCustForm from './reduxFormPage';
import Infinite from 'react-infinite';
import AddressAutocomplete from '../Forms/googleAutocomplete';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

  const styles = {
    paperStyle: {
   
      width: 500,
      position: 'relative',
      margin: 'auto',
      marginTop: 20,
      textAlign: 'center',
    },
      undelineStyle: {
        borderColor: grey50,
      },
    };

 class newCustomerForm extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
    };

  this.dummyAsync = this.dummyAsync.bind(this);
  this.handleNext = this.handleNext.bind(this);
  this.handlePrev = this.handlePrev.bind(this);  
  this.getStepContent = this.getStepContent.bind(this);
  this.renderContent = this.renderContent.bind(this);
}
  
  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext () {
    const {stepIndex} = this.state;
      if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }


  };

  handlePrev () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div>
            <Paper style={styles.paperStyle} zDepth={1} >
            <br/>
            <h3>Enter Customer Details</h3>
            <SubmitCustForm next={this.handleNext}/>
            </Paper>
            </div>
        );
      case 1:
        return (
          <div>
            <Paper style={styles.paperStyle} zDepth={1} >
            <br/>
            <h3>Dispatch Surveyor</h3>
            <AddressAutocomplete hintText= {"Address"}/>
           
     
            </Paper>
            </div>
        );
      case 2:
        return (
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with your
            ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};
    const hide = {display: 'none'}

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            style={stepIndex === 0 ? hide : contentStyle}
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            type='submit'
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }


  render() {
  const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Customer Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Dispatch</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );

  }
}

export default newCustomerForm

if (module.hot) {
  module.hot.accept();
}
