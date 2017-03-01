import React from 'react';
import Flexbox from 'flexbox-react';
import { graphql, compose } from 'react-apollo';

import GenericsPaperLeft from './GenericsPaperLeft';
import GenericsPaperRight from './GenericsPaperRight';

import { PaperStyles } from '../../styles/mainStyles';
import { addGenerics } from '../../graphql/mutations.js';


class _GenericsContainer extends React.Component {
   constructor() {
     super();
     this.state = {
       heading: '',
       subheading: '',
       warranty: '',
       paragraphitem: '',
       paragraph: [],
       bulletitem: '',
       bulletpoints: [],
     };
   }

  componentDidMount() {
    console.log(window.innerWidth)

  }

  setBulletItem = (value) => {
    this.setState({
      bulletitem: value,
    });
  };

  setHeading = (value) => {
    this.setState({
      heading: value,
    });
  };
  setWarranty = (value) => {
    this.setState({
      warranty: value,
    });
  };

  setParagraph = (value) => {
    this.setState({
      paragraphitem: value,
    });
  };

  addBulletItemtoList = () => {
    this.state.bulletpoints.push(this.state.bulletitem);
    this.setState({ bulletitem: '' });
  };
  addParagraphtoList = () => {
    this.state.paragraph.push(this.state.paragraphitem);
    this.setState({ paragraphitem: '' });
  };

  submitGeneric = () => {
    console.log(this)

      
    this.props.addGenerics({
      variables: {
        heading: this.state.heading,
        bulletpoints: this.state.bulletpoints,
        paragraph: this.state.paragraph,
        warranty: this.state.warranty,
      },
    }).then(() => this.setState({
        heading: '',
       subheading: '',
       warranty: '',
       paragraphitem: '',
       paragraph: [],
       bulletitem: '',
       bulletpoints: [],

    }));
  
   
    
  }
  render() {
    return (
      <Flexbox
        flexDirection="row"
        alignContent={'space-between'}
      >
        <GenericsPaperLeft
          setHeading={this.setHeading}
          setBulletItem={this.setBulletItem}
          addBulletItemtoList={this.addBulletItemtoList}
          addParagraphtoList={this.addParagraphtoList}
          setParagraph={this.setParagraph}
          bulletitem={this.state.bulletitem}
          heading={this.state.heading}
          warranty={this.state.warranty}
          paragraphitem={this.state.paragraphitem}
          setWarranty={this.setWarranty}
        />
        <GenericsPaperRight
          heading={this.state.heading}
          subheading={this.state.subheading}
          paragraph={this.state.paragraph}
          warranty={this.state.warranty}
          bulletpoints={this.state.bulletpoints}
          submitGeneric={this.submitGeneric}
        />
      </Flexbox>
      
    );
  }
}

const GenericsContainer = compose(
  graphql(addGenerics, { name: 'addGenerics' }),
)(_GenericsContainer);

export default GenericsContainer;