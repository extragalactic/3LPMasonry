import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { filter } from 'lodash';
import getUserID from '../../utils/getUserID';
import { addSurveyPhoto, toggleSurveyReady } from '../../graphql/mutations';

const styles = {
  paperStyle: {
    height: 300,
    width: 300,
    margin: 'auto',
    marginTop: '10%',
    backgroundColor: grey200,
  },
  photoStyle: {
    marginLeft: '20%',
    marginRight: '25%',
    marginTop: '10%',

  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class _CustomerUploadContainer extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }
  componentDidMount() {
  }
  onInputChange = (e) => {
    const that = this;
    filter(
            e.target.files,
            file => file.type.match(this.props.fileTypeRegex) !== null,
        )
            .forEach(
                (file) => {
                  const reader = new FileReader();
                  reader.onload = this.props.onFileLoad;
                  reader.readAsDataURL(file);
                  setTimeout(() => {
                    this.props.addSurveyPhoto({
                    variables: {
                      heading: 'Online Estimate',
                      description: 'Online Estimate',
                      orginalBase64: reader.result,
                      timestamp: new Date(),
                      custid: this.props.router.location.pathname.split('/')[2],
                      user: getUserID(),
                    },
                  });
                  }, 2000);
              
                },
            );
  }
  render() {
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme(darkBaseTheme)}
      >
        <FlatButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.uploadButton}
          containerElement="label"
        >
          <input multiple type="file" style={styles.uploadInput} onChange={(img, i) => this.onInputChange(img, i)} />
        </FlatButton>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});


const CustomerUploadContainer = compose(
   graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
   graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
   connect(mapStateToProps, null)
)(_CustomerUploadContainer);

export default CustomerUploadContainer;
