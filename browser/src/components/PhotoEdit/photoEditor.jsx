import React from 'react';
import PropTypes from 'prop-types';
import { SketchField, Tools } from 'react-sketch';
import { graphql, compose } from 'react-apollo';
import { Row, Col } from 'react-flexbox-grid';
import Dimensions from 'react-dimensions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import ClearIcon from 'material-ui/svg-icons/action/delete';
import SaveIcon from 'material-ui/svg-icons/content/save';
import {
    IconButton,
    MenuItem,
    SelectField,
} from 'material-ui';

import { getSinglePhoto, addSurveyPhoto } from '../../graphql/mutations';
import WarningMessage from '../Utils/WarningMessage';

const styles = {
  dropdownTitle: {
    fontSize: 18,
    fontFamily: 'Verdana',
    color: '#777',
  },
  iconButton: {
    width: 75,
    height: 75,
  },
  icon: {
    paddingRight: 30,
  },
  dropdown: {
    width: 200,
    height: 40,
    fontSize: 25,
    padding: 8,
  },
  menuItem: {
    fontSize: 25,
    padding: 5,
  },
};
const options = {
  stretched: true,
  stretchedX: false,
  stretchedY: false,
};

class _PhotoEditor extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    addSurveyPhoto: PropTypes.func.isRequired,
    getSinglePhoto: PropTypes.func.isRequired,
    containerWidth: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isSaving: false,
      imageWidth: this.props.containerWidth,
      imageSizeRatio: 1.33,
      canUndo: false,
      canRedo: false,
      tool: Tools.Pencil,
      lineColor: 'red',
    };
    this.colourRGB = { red: '#f00', black: '#000', yellow: '#ff0' };
    this.custID = '';
    this.photoIndex = 0;
    this.photoData = {};
    this.isValidImage = false;

    this.onSelectTool = this.onSelectTool.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSketchChange = this.onSketchChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    if (!(this.props.params.custid && this.props.params.docID)) {
      this.setState({ isLoaded: true });
      return;
    }

    this.isValidImage = true;
    this.custID = this.props.params.custid;
    this.docID = this.props.params.docID;
    // this.custID = '5903eb3c0149230ce904439a';
    // this.docID = 'IFjCKx1TH4ub';

    this.props.getSinglePhoto({
      variables: {
        custid: this.custID,
        docID: this.docID,
      },
    }).then((data) => {
      this.photoData = data.data.getCustomerPhoto;
      const photoURL = this.photoData.photo;

      // First load the background image into an Image object so we can retrieve the width/height
      // which is used to calculate the image size ratio, so that the image keeps aspect ratio when
      // sizing it to match the screen width using Dimensions.
      // Hopefully the first image load will be buffered by the browser/device.
      const img = new Image();
      img.onload = () => {
        const newImageRatio = img.width / img.height;
        this.setState({
          imageSizeRatio: newImageRatio,
        }, () => {
          if (photoURL) {
            this.sketch.setBackgroundFromDataUrl(photoURL, options);
          } else {
            this.isValidImage = false;
          }
          this.setState({ isLoaded: true });
        });
      };
      img.src = photoURL;
    }).catch(() => {
      this.isValidImage = false;
      this.setState({ isLoaded: true });
    });
  }

  onSelectTool(event, index, value) {
    this.setState({
      tool: value,
    });
  }

  onSelectColor(event, index, value) {
    this.setState({
      lineColor: value,
    });
  }

  onUndo() {
    this.sketch.undo();
    this.setState({
      canUndo: this.sketch.canUndo(),
      // canRedo: this.sketch.canRedo(),
    });
  }

  onClear() {
    this.sketch.clear();
    this.sketch.setBackgroundFromDataUrl(this.photoData.photo, options);
    this.setState({
      canUndo: this.sketch.canUndo(),
      // canRedo: this.sketch.canRedo(),
    });
  }

  onSketchChange() {
    const prev = this.state.canUndo;
    const now = this.sketch.canUndo();
    if (prev !== now) {
      this.setState({ canUndo: now });
    }
  }

  onSaveComplete() {
    this.setState({
      isSaving: false,
    });
  }

  onSave() {
    this.setState({
      isSaving: true,
    });
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const userID = userProfile && userProfile.user_id ? userProfile.user_id : 'photo_edit';
    // console.log('Saving...');
    // console.log('CustID = ' + this.custID);
    // console.log('userID = ' + userID);

    this.props.addSurveyPhoto({
      variables: {
        heading: 'TestHeading',
        description: this.photoData.description,
        orginalBase64: this.sketch.toDataURL(),
        timestamp: new Date(),
        custid: this.custID,
        user: userID,
      },
    }).then(() => {
      this.onSaveComplete();
    }).catch(() => {
      this.setState({
        isSaving: false,
      });
    });
  }

  render() {
    if (!this.isValidImage && this.state.isLoaded) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div><WarningMessage message="Photo not found." /></div>
        </MuiThemeProvider>
      );
    }
    return (
      <Row style={{ marginLeft: 10, visibility: this.state.isLoaded ? 'visible' : 'hidden' }}>
        <Col>
          <Row>
            <Col>
              <div>
                <SketchField
                  name="sketch"
                  ref={(c) => { this.sketch = c; }}
                  width={`${this.props.containerWidth}px`}
                  height={`${this.props.containerWidth / this.state.imageSizeRatio}px`}
                  tool={this.state.tool}
                  lineColor={this.state.lineColor}
                  lineWidth={3}
                  onChange={this.onSketchChange}
                />
              </div>
              <br />
            </Col>
          </Row>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <Row>
                <Col xs >
                  <label htmlFor="tool" style={styles.dropdownTitle}>Edit Tool:</label><br />
                  <SelectField ref="tool" value={this.state.tool} onChange={this.onSelectTool} style={styles.dropdown}>
                    <MenuItem style={styles.menuItem} value={Tools.Pencil} primaryText="Pencil" />
                    <MenuItem style={styles.menuItem} value={Tools.Arrow} primaryText="Arrow" />
                    <MenuItem style={styles.menuItem} value={Tools.Rectangle} primaryText="Rectangle" />
                    <MenuItem style={styles.menuItem} value={Tools.TextField} primaryText="Text" />
                  </SelectField>
                </Col>
                <Col xs >
                  <label htmlFor="color" style={styles.dropdownTitle}>Colour:</label><br />
                  <SelectField ref="color" value={this.state.lineColor} onChange={this.onSelectColor} style={styles.dropdown}>
                    <MenuItem style={styles.menuItem} value={'red'} primaryText="Red" />
                    <MenuItem style={styles.menuItem} value={'yellow'} primaryText="Yellow" />
                    <MenuItem style={styles.menuItem} value={'black'} primaryText="Black" />
                  </SelectField>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Row around="xs">
                    <Col xs={3} style={styles.icon}>
                      <IconButton
                        onTouchTap={this.onUndo}
                        iconStyle={styles.iconButton}
                        style={styles.icon}
                        disabled={!this.state.canUndo}
                      >
                        <UndoIcon />
                      </IconButton>
                    </Col>
                    <Col xs={3} style={styles.icon}>
                      <IconButton
                        onTouchTap={this.onClear}
                        iconStyle={styles.iconButton}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Col>
                    <Col xs={3} style={styles.icon}>
                      <IconButton
                        onTouchTap={this.onSave}
                        iconStyle={styles.iconButton}
                        style={styles.icon}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </MuiThemeProvider>
        </Col>
      </Row>
    );
  }
}

const PhotoEditor = compose(
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
  graphql(getSinglePhoto, { name: 'getSinglePhoto' }),
)(_PhotoEditor);


module.exports = Dimensions({
  getHeight() {
    const heightOffset = 10;
    return window.innerHeight - heightOffset;
  },
  getWidth() {
    const widthOffset = 20;
    return window.innerWidth - widthOffset;
  },
})(PhotoEditor);

export default PhotoEditor;
