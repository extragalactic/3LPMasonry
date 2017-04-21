import React from 'react';
import { SketchField, Tools } from 'react-sketch';
import { graphql, compose } from 'react-apollo';

import {
    AppBar,
    Card,
    CardText,
    CardHeader,
    IconButton,
    GridList,
    GridTile,
    MenuItem,
    Slider,
    SelectField,
    Toggle,
    ToolbarSeparator
} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import RedoIcon from 'material-ui/svg-icons/content/redo';
import ClearIcon from 'material-ui/svg-icons/action/delete';
import SaveIcon from 'material-ui/svg-icons/content/save';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import ZoomInIcon from 'material-ui/svg-icons/action/zoom-in';
import ZoomOutIcon from 'material-ui/svg-icons/action/zoom-out';

import { getSurveyPhotos, addSurveyPhoto } from '../../graphql/mutations';

// const sketch = Sketch.SketchField.prototype;
// window.sketch = sketch;

class _PhotoEditor extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  };
  
  constructor() {
    super();
    this.state = {
      isSaving: false,
      photos: [],
    };
  }

  componentDidMount() {

    const photoID = this.props.params.id;
    console.log('PhotoID = ' + photoID);

    this.props.getSurveyPhotos({
      variables: {
        id: "58dfbac55d535f2ecb726a83",
      }
    }).then((data) => {
      const photoURL = data.data.getSurveyPhotos[0].photo;
      this.sketch.setBackgroundFromDataUrl(photoURL);
    }).catch(() => {
      console.log('Image not found');
    });
  
    //const photoURL = this.props.params.url;
    //this.sketch.setBackgroundFromDataUrl(photoURL);
 }

  onSaveComplete() {
    console.log('save completed');
    this.setState({
      isSaving: false,
    });
  }

  saveAnnotatedPhoto() {
    this.setState({
      isSaving: true,
    });

    this.props.addSurveyPhoto({
      variables: {
        heading: 'TestHeading',
        description: 'TestDescription',
        orginalBase64: this.sketch.toDataURL(),
        timestamp: new Date(),
        // custid: this.props.custid,
        custid: '58dfbac55d535f2ecb726a83',
        user: JSON.parse(localStorage.getItem('profile')).user_id,
      },
    }).then( () => {
      this.onSaveComplete();
    }).catch( () => {
      this.setState({
        isSaving: false,
      }); 
    });    
  }

  render() {
    return (
      <div>
        <SketchField
          name='sketch'
          ref={(c) => this.sketch = c}
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
   graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
   graphql(getSurveyPhotos, { name: 'getSurveyPhotos' }),
)(_PhotoEditor);

export default PhotoEditor;