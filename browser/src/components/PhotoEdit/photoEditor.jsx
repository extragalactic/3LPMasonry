import React from 'react';
import { SketchField, Tools } from 'react-sketch';
import { graphql, compose } from 'react-apollo';
import { Grid, Row, Col } from 'react-flexbox-grid';

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

import { getSinglePhoto, getSurveyPhotos, addSurveyPhoto } from '../../graphql/mutations';

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
      tool: Tools.Pencil,
      lineColor: 'red'
    };
    this.colourRGB = {'red':'#f00', 'black':'#000', 'yellow':'#ff0'};

    this.onSelectTool = this.onSelectTool.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
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

  onSelectTool(event, index, value) {
    console.log(value);
    this.setState({
      tool: value
    });
  }

  onSelectColor(event, index, value) {
    console.log(value);     
    this.setState({
      lineColor: value
    });   
  }

  render() {
    return (
      <Row style={{marginLeft:10}}>
      <Col>
        <Row>
          <Col>
            <div>
              <SketchField
                name='sketch'
                ref={(c) => this.sketch = c}
                width="800px"
                height="600px"
                tool={this.state.tool}
                lineColor={this.state.lineColor}
                lineWidth={3}
              />
            </div>
          </Col>
        </Row>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Row>
          <Col>
            <label htmlFor='tool'>Edit Tool</label><br/>
            <SelectField ref='tool' value={this.state.tool} onChange={this.onSelectTool}>
              <MenuItem value={Tools.Pencil} primaryText="Pencil"/>
              <MenuItem value={Tools.Line} primaryText="Line"/>
              <MenuItem value={Tools.Rectangle} primaryText="Rectangle"/>
              <MenuItem value={Tools.Select} primaryText="Select"/>              
            </SelectField>
          </Col>
          <Col>
            <label htmlFor='color'>Colour</label><br/>
            <SelectField ref='color' value={this.state.lineColor} onChange={this.onSelectColor}>
              <MenuItem value={'red'} primaryText="Red"/>
              <MenuItem value={'black'} primaryText="Black"/>
              <MenuItem value={'yellow'} primaryText="Yellow"/>
            </SelectField>
          </Col>             
        </Row>
        </MuiThemeProvider>  
      </Col>
      </Row>
    );
  }
}

const PhotoEditor = compose(
   graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
   graphql(getSurveyPhotos, { name: 'getSurveyPhotos' }),
   graphql(getSinglePhoto, { name: 'getSinglePhoto' }),
)(_PhotoEditor);

export default PhotoEditor;