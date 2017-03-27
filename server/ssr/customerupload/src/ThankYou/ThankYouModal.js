import React from 'react';
import Modal from 'react-modal';
import '../App.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    marginRight: '-50%',
    height: '60%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    display: 'inline-block',
  },
};

class ThankYouModal extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      notes: '',
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="App-intro">
          Thank You
        </p>
      </Modal>
    );
  }
}


export default ThankYouModal;
