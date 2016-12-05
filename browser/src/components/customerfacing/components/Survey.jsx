import React from 'react';
import Paper from 'material-ui/Paper';
import uploadcare from 'uploadcare-widget';

const styles = {
    backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/aletheiatec/3LP/img/tlplogosmall.png")',
    image: {
        height: 140,
        width: 100,
        marginLeft: 200,
        marginRight: 'auto',
        postition: 'relative'
    }
};

export default class Survey extends React.Component {
    constructor () {
        super();
    }
    componentDidMount () {
        var multiWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
        multiWidget.onChange((data) => {
            data.files().forEach((file) => {
                file.done((info) => {
                    console.log(that.state);
                    axios.post('/saveimage', { payload: info, id: that.state.customer._id });
                });
            });
        });

        multiWidget.openDialog(null, {

        });
    }
    render () {
        return (
            <div>
                     Hello please upload photos of your property.
                     <br/>
                    <input type="hidden" role="uploadcare-uploader" data-public-key="256f02178b83ce8dc2de" data-images-only data-multiple 
                    data-tabs="file"
                    />
                     </div>
        );
    }
}
