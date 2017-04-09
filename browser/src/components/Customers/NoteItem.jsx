import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import styleCSS from '../../styles/customerDetailsStyles';


class NoteItem extends React.Component {
	static propTypes = {
		note: React.PropTypes.object.isRequired,
		custid: React.PropTypes.string.isRequired,
		index: React.PropTypes.number.isRequired,
		deleteNote: React.PropTypes.func.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			active: 0
		}
	}

	onMouseEnter = () => {
		this.setState({
			active: 1
		});
	}

	onMouseLeave = () => {
		this.setState({
			active: 0
		});
	}

	onDelete = () => {
		this.setState({
			active: 2
		});

    this.props.deleteNote({
      variables: {
        custid: this.props.custid,
        index: this.props.index
      }
		});			
	};

	render() {
		const note = this.props.note;
		
		 
		let backStyle = {};
		
		if(this.state.active===0) {
			backStyle = styleCSS.noteItemDeSelected;
		} else if (this.state.active===1) {
			backStyle = styleCSS.noteItemSelected;
		} else {
			backStyle = styleCSS.noteItemMarked;
		}

		return (
				<div style={{paddingTop:5, paddingLeft:0, width: 362}}>
					<Row 
						onMouseEnter={this.onMouseEnter} 
						onMouseLeave={this.onMouseLeave}
						style={{minHeight: 55}}
						>
						<Col md={11} lg={11} style={ backStyle }>						
							<Row><div style={styleCSS.surveyNoteTitle}>{note.user.name} says:</div></Row>
							<Row><div style={styleCSS.surveyNoteText}>{note.text}</div><br /></Row>
						</Col>
						<Col md={1} lg={1} style={backStyle}>
							<div>
								{this.state.active>0 &&
									<IconButton tooltip="Delete" style={{marginLeft:-15, marginTop:-5}}>
										<ActionDeleteForever onClick={this.onDelete} color={"#777"} style={{width:30, height:30}} />
									</IconButton>
								}
							</div>
						</Col>
					</Row>
				</div>
		);
	}
}

export default NoteItem;

/* style={this.state.active ? styleCSS.noteItemSelected : styleCSS.noteItemDeselected}
*/