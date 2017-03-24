import React from 'react';
import Sketch from 'react-sketch';
import { graphql, compose } from 'react-apollo';
import { getSurveyPhotos, getImageBase64 } from '../../graphql/mutations';

const SketchField = Sketch.SketchField;
const Tools = Sketch.Tools;
const sketch = Sketch.SketchField.prototype;
window.sketch = sketch;

class _PhotoEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <SketchField
          width="1024px"
          height="768px"
          tool={Tools.Pencil}
          color="black"
          lineWidth={3}
        />

      </div>
    );
  }
}

const PhotoEditor = compose(
   graphql(getSurveyPhotos, { name: 'getCustomer' }),
   graphql(getImageBase64, { name: 'getImageBase64' }),
)(_PhotoEditor);


export default PhotoEditor;


/*
   this.props.getImageBase64({
     variables: {
       docID: "5EUehnssYZiO",
     }
   }).then((data) => {
     console.log(data)
   })

   graphql(getImageBase64, { name: 'getImageBase64' }),


*/
