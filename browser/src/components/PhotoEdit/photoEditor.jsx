import React from 'react';
import PropTypes from 'prop-types';
import { SketchField, Tools } from 'react-sketch';
import { graphql, compose } from 'react-apollo';
import { Row, Col } from 'react-flexbox-grid';
import Dimensions from 'react-dimensions';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { IconButton } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save'; // save
import UndoIcon from 'material-ui/svg-icons/content/undo'; // undo
import ClearIcon from 'material-ui/svg-icons/action/delete'; // clear
import LooksOneIcon from 'material-ui/svg-icons/image/looks-one'; // small font
import LooksTwoIcon from 'material-ui/svg-icons/image/looks-two'; // medium font
import LooksThreeIcon from 'material-ui/svg-icons/image/looks-3'; // large font
import EditIcon from 'material-ui/svg-icons/image/edit'; // pencil
import Crop32Icon from 'material-ui/svg-icons/image/crop-3-2'; // rectangle
import TextFieldsIcon from 'material-ui/svg-icons/editor/text-fields'; // textfield
import LineIcon from 'material-ui/svg-icons/content/remove'; // line
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-forward'; // arrow
import LensIcon from 'material-ui/svg-icons/image/lens'; // colour swatch
import PanToolIcon from 'material-ui/svg-icons/action/pan-tool'; // image pan
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { getSinglePhoto, addSurveyPhoto } from '../../graphql/mutations';
import WarningMessage from '../Utils/WarningMessage';
import IconBar from '../Utils/IconBar';
import { buttonStyles } from '../Utils/IconItem';
import PinchZoomPan from '../Utils/PinchZoomPan';

class _PhotoEditor extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    addSurveyPhoto: PropTypes.func.isRequired,
    getSinglePhoto: PropTypes.func.isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isSaving: false,
      imageWidth: this.props.containerWidth,
      imageSizeRatio: 1.33,
      openSaveConfirm: false,
      canUndo: false,
      tool: Tools.None,
      pinchZoomPanToggle: true,
      lineColor: 'red',
      fontSize: 'medium',
      testlog: 'default',
    };
    this.colourRGB = { red: '#f00', black: '#000', yellow: '#ff0' };
    this.fontSizes = { small: 11, medium: 17, large: 26 };
    this.custID = '';
    this.photoIndex = 0;
    this.photoData = {};
    this.isValidImage = false;
    this.zoomLevel = 1;
    this.baseImage = new Image();

    this.iconGroups = {
      editorActions: {
        title: 'Actions',
        buttonStyle: buttonStyles.NORMAL,
        iconSize: 7,
        icons: [
          { label: 'Undo', type: UndoIcon },
          { label: 'Clear', type: ClearIcon },
          { label: 'Save', type: SaveIcon },
        ],
      },
      toolSelect: {
        title: 'Tools',
        buttonStyle: buttonStyles.RADIO,
        radioSelected: [true, false, false, false, false, false],
        iconSize: 7,
        icons: [
          { label: 'Pan', param: 'pan', type: PanToolIcon },
          { label: 'Pencil', param: 'pencil', type: EditIcon },
          { label: 'Line', param: 'line', type: LineIcon },
          { label: 'Arrow', param: 'arrow', type: ArrowIcon },
          { label: 'Box', param: 'box', type: Crop32Icon },
          { label: 'Text', param: 'text', type: TextFieldsIcon },
        ],
      },
      colourSelect: {
        title: 'Colour',
        buttonStyle: buttonStyles.RADIO,
        radioSelected: [true, false, false],
        iconSize: 7,
        icons: [
          { label: 'Red', param: 'red', type: LensIcon, colour: '#f00' },
          { label: 'Yellow', param: 'yellow', type: LensIcon, colour: '#ff0' },
          { label: 'Black', param: 'black', type: LensIcon, colour: '#000' },
        ],
      },
      fontSize: {
        title: 'Text Size',
        buttonStyle: buttonStyles.RADIO,
        radioSelected: [false, true, false],
        iconSize: 7,
        icons: [
          { label: 'Small', param: 'small', type: LooksOneIcon },
          { label: 'Medium', param: 'medium', type: LooksTwoIcon },
          { label: 'Large', param: 'large', type: LooksThreeIcon },
        ],
      },
    };
    // ToDo: The radioSelected vars should be a state var, merging functionality with the existing state vars
    // that determine which icon is selected. i.e. the IconBar is not yet properly using a stateful pattern.
    // I shouldn't have to manually set the true/false initial values in radioSelected.
    // For the current implementation, this is ok though.

    this.onSelectTool = this.onSelectTool.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
    this.onSelectFontSize = this.onSelectFontSize.bind(this);
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSketchChange = this.onSketchChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onOpenSaveConfirm = this.onOpenSaveConfirm.bind(this);
    this.onCloseSaveConfirm = this.onCloseSaveConfirm.bind(this);
  }

  componentDidMount() {
    if (!(this.props.params.custid && this.props.params.docID)) {
      /* eslint-disable react/no-did-mount-set-state */
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

      this.baseImage.crossOrigin = 'Anonymous';
      this.baseImage.onload = () => {
        const newImageRatio = this.baseImage.width / this.baseImage.height;
        this.setState({
          imageSizeRatio: newImageRatio,
        }, () => {
          if (photoURL) {
            this.sketch.setBaseImage(this.baseImage);
            this.pinchpanzoom.zoom();
          } else {
            this.isValidImage = false;
          }
          this.setState({ isLoaded: true });
        });
      };
      this.baseImage.src = photoURL;
    }).catch(() => {
      this.isValidImage = false;
      this.setState({ isLoaded: true });
    });
  }

  onSelectTool(value) {
    if (this.state.tool === Tools.TextField) {
      this.sketch.deselectObjects();
    }
    let tool;
    switch (value) {
      case 'pan':
        tool = Tools.None;
        break;
      case 'pencil':
        tool = Tools.Pencil;
        break;
      case 'line':
        tool = Tools.Line;
        break;
      case 'arrow':
        tool = Tools.Arrow;
        break;
      case 'box':
        tool = Tools.Rectangle;
        break;
      case 'text':
        tool = Tools.TextField;
        break;
      default:
        tool = Tools.Pencil;
    }
    const pinchZoom = value === 'pan';
    this.setState({
      tool,
      pinchZoomPanToggle: pinchZoom,
    });
  }

  onSelectColor(value) {
    this.setState({
      lineColor: value,
    });
  }

  onSelectFontSize(value) {
    this.setState({
      fontSize: value,
    });
  }

  onZoomIn() {
    this.sketch.zoom(1.25);
    this.zoomLevel += 1;
  }

  onZoomOut() {
    if (this.zoomLevel > 1) {
      this.sketch.zoom(0.8);
      this.zoomLevel -= 1;
    }
    if (this.zoomLevel === 1) {
      this.sketch.centerContent();
    }
  }

  onUndo() {
    if (!this.state.canUndo) {
      return;
    }
    this.sketch.undo();
    this.setState({
      canUndo: this.sketch.canUndo(),
    });
  }

  onClear() {
    this.sketch.clear();
    this.sketch.setBaseImage(this.baseImage);
    this.sketch.centerContent();
    this.zoomLevel = 1;
    this.pinchpanzoom.zoom(1.0);
    this.pinchpanzoom.reset();

    this.setState({
      canUndo: this.sketch.canUndo(),
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
    // send a message back to RN to close the editing window
    this.returnToReactNative();
  }

  onSave() {
    this.setState({
      isSaving: true,
    });
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const userID = userProfile && userProfile.user_id ? userProfile.user_id : 'photo_edit';

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
      // Note: should add a "save failed" popup
      this.setState({
        isSaving: false,
      });
    });
  }

  onOpenSaveConfirm() {
    this.setState({ openSaveConfirm: true });
  }

  onCloseSaveConfirm() {
    this.setState({ openSaveConfirm: false });
  }

  returnToReactNative = () => {
    window.postMessage();
  }

  width = (percent) => {
    return this.props.containerWidth * (percent / 100);
  }

  imageViewerHeight = () => {
    const viewerHeight = this.props.containerHeight - this.width(this.iconGroups.editorActions.iconSize) - 70;
    return viewerHeight;
  }

  logger = (msg) => {
    console.log(msg);
    this.setState({
      testlog: msg,
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

    const mainPageStyle = {
      visibility: this.state.isLoaded ? 'visible' : 'hidden',
      backgroundColor: '#000',
      borderStyle: 'solid',
      borderWidth: 3,
      borderRadius: 3,
      borderColor: '#000',
    };
    const backButtonStyle = {
      width: '9vh',
      height: '10vh',
      color: '73D8FF',
    };

    const confirmSaveButtons = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.onCloseSaveConfirm}
      />,
      <FlatButton
        label="Save"
        primary
        keyboardFocused
        onTouchTap={this.onSave}
      />,
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div style={mainPageStyle}>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col>
                <Row style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff' }}>
                  <div>
                    <Col style={{ marginLeft: 0, marginTop: -10 }}>
                      { /*
                      <Row>
                        <span style={styleCSS.title}>Photo Editor</span>
                      </Row>
                      */ }
                      <Row>
                        <IconButton
                          onTouchTap={this.returnToReactNative}
                          iconStyle={backButtonStyle}
                          style={backButtonStyle}
                        >
                          <KeyboardArrowLeftIcon />
                        </IconButton>
                      </Row>
                    </Col>
                  </div>
                  <div style={{ marginTop: 5, marginBottom: 5, paddingRight: 5 }}>
                    <IconBar
                      iconGroupData={this.iconGroups.editorActions}
                      iconWidth={this.iconGroups.editorActions.iconSize}
                      funcList={[this.onUndo, this.onClear, this.onOpenSaveConfirm]}
                    />
                  </div>
                </Row>
              <Row style={{ display: 'flex', justifyContent: 'center', paddingLeft: 0 }}>
                <div>
                  <PinchZoomPan
                    width={this.props.containerWidth}
                    height={this.imageViewerHeight()}
                    initialScale={1.0}
                    active={this.state.pinchZoomPanToggle}
                    name="pinchpanzoom"
                    ref={(c) => { this.pinchpanzoom = c; }}
                    logger={this.logger}
                  >
                    {(x, y, scale) => (
                      <SketchField
                        style={this.state.pinchZoomPanToggle ?
                        {
                          pointerEvents: scale === 1 ? 'auto' : 'none',
                          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                          transformOrigin: '0 0',
                        }
                          :
                        {
                          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                          transformOrigin: '0 0',
                        }}
                        name="sketch"
                        ref={(c) => { this.sketch = c; }}
                        width={`${this.props.containerWidth}px`}
                        height={`${this.props.containerWidth / this.state.imageSizeRatio}px`}
                        tool={this.state.tool}
                        lineColor={this.state.lineColor}
                        lineWidth={3}
                        fontSize={this.fontSizes[this.state.fontSize]}
                        onChange={this.onSketchChange}
                      />
                    )}
                  </PinchZoomPan>
                </div>
              </Row>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '-19vh',
                  marginBottom: 10 }}
              >
                <IconBar
                  iconGroupData={this.iconGroups.toolSelect}
                  iconWidth={this.iconGroups.toolSelect.iconSize}
                  funcList={[this.onSelectTool]}
                />
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ borderRightStyle: 'solid', borderRightColor: '#999', borderRightWidth: 2, paddingRight: 4 }}>
                  <IconBar
                    iconGroupData={this.iconGroups.colourSelect}
                    iconWidth={this.iconGroups.colourSelect.iconSize}
                    funcList={[this.onSelectColor]}
                  />
                </div>
                <div style={{ paddingLeft: 2 }}>
                  <IconBar
                    iconGroupData={this.iconGroups.fontSize}
                    iconWidth={this.iconGroups.fontSize.iconSize}
                    funcList={[this.onSelectFontSize]}
                  />
                </div>
              </Row>
            </Col>
          </Row>
          {/*
          <Row>
            <TextField
              id="text-field-log"
              value={this.state.testlog}
            />
          </Row>
          */}
          <Dialog
            title="Save Image?"
            actions={confirmSaveButtons}
            modal={false}
            open={this.state.openSaveConfirm}
            onRequestClose={this.onCloseSaveConfirm}
          >
            This will keep a copy of the original image.
          </Dialog>
        </div>
      </MuiThemeProvider>
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
