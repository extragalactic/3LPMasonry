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

class CustomerSurvey extends React.Component {
    render () {
        return (
      <div>
        <h1>HEllo!</h1>
      </div>
        );
    }
}


export default CustomerSurvey;
