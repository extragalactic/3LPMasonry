import React from 'react';
import Modal from 'react-modal';
import '../App.css';
const style = {
  photoStyle: {
    width: '30%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',

  },
};
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
        <img
          alt={'_'}
          src="https://s3.ca-central-1.amazonaws.com/tlpm/pictures/iTunesArtwork%403x.png" 
          style={style.photoStyle}
        />
        <div className="App-intro">
          <h4> Thank You for contacting Three Little Pigs Masonry</h4>
          <h4> We look forward to helping you improve or protect your home investment</h4>
          <h4> Keep an eye on your email or spam folder to receive your estimate, it will be sent out shortly</h4>
          <h4> If we need more into, a TLP staff member will contact you</h4>
        </div>
      </Modal>
    );
  }
}


export default ThankYouModal;
