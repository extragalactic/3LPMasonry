import React, { PropTypes as T } from 'react';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';

const style = {
    paperStyle: {
        height: 300,
        width: 300,
        margin: 'auto',
        marginTop: '10%',
        backgroundColor: grey200
    },
    photoStyle: {
        marginLeft: '20%',
        marginRight: '25%',
        marginTop: '10%'

    }
};

export class Home extends React.Component {
    render () {
        return (
      <div>
         <Paper style={style.paperStyle} zDepth={5}>
         <img src="https://s3-us-west-2.amazonaws.com/aletheiatec/3LP/img/tlplogosmall.png" style={style.photoStyle}/>
         </Paper>
      </div>
        );
    }
}

Home.contextTypes = {
    router: T.object
};

export default Home;
