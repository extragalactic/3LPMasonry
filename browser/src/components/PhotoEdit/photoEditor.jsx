import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getSurveyPhotos } from '../../graphql/mutations';
import {SketchField, Tools} from 'react-sketch';

class _PhotoEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }
  render() {
     return (
    <SketchField width='1024px' 
                         height='768px' 
                         tool={Tools.Pencil} 
                         color='black'
                         lineWidth={3}/>
    );
  }
}

const PhotoEditor = compose(
   graphql(getSurveyPhotos, { name: 'getCustomer' }),
)(_PhotoEditor);


export default PhotoEditor;
