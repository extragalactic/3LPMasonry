import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

import CustomerDetailsFormRoot from './CustomerDetailsFormRoot';
import CustomerDispatchFormRoot from './CustomerDispatchFormRoot';
import CustomerConfirmation from './CustomerConfirmation';

class newCustomerForm extends React.Component {
    constructor () {
        super();
        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0
        };

        this.dummyAsync = this.dummyAsync.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    dummyAsync (cb) {
        this.setState({ loading: true }, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    }

    handleNext () {
        const { stepIndex } = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2
            }));
        }
    }

    handlePrev () {
        const { stepIndex } = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1
            }));
        }
    }

    getStepContent (stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
            <CustomerDetailsFormRoot next={this.handleNext}/>
                );
            case 1:
                return (
            <CustomerDispatchFormRoot next={this.handleNext}/>
                );
            case 2:
                return (
                      <CustomerConfirmation next={this.handleNext} prev={this.handlePrev}/>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent () {
        const { finished, stepIndex } = this.state;
        const contentStyle = { margin: '0 16px', overflow: 'hidden' };
        const hide = { display: 'none' };

        if (finished) {
            return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                  event.preventDefault();
                  this.setState({ stepIndex: 0, finished: false });
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
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
          />
       </div>
      </div>
        );
    }


    render () {
        const { loading, stepIndex } = this.state;

        return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
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
        <ExpandTransition loading={loading} open>
          {this.renderContent()}
        </ExpandTransition>
      </div>
        );
    }
}

export default newCustomerForm;
