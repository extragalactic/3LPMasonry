import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import styleCSS from '../../styles/customerDetailsStyles';


class NoteItem extends React.Component {
	static propTypes = {
		note: React.PropTypes.object.isRequired,
		index: React.PropTypes.number.isRequired,
		deleteNote: React.PropTypes.func.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			active: false
		}
	}

	onMouseEnter = () => {
		this.setState({
			active: true
		});
	}

	onMouseLeave = () => {
		this.setState({
			active: false
		});
	}

	onDelete = () => {
    this.props.deleteNote({
      variables: {
        custid: this.props.id,
        index: this.props.index
      }
		});			
	};

	render() {
		const note = this.props.note;

		return (
				<div style={{paddingTop:5, paddingLeft:0, width: 362}}>
					<Row 
						onMouseEnter={this.onMouseEnter} 
						onMouseLeave={this.onMouseLeave}
						style={{minHeight: 55}}
						>
						<Col md={11} lg={11} style={this.state.active ? styleCSS.noteItemSelected : styleCSS.noteItemDeselected}>						
							<Row><div style={styleCSS.surveyNoteTitle}>{note.user.name} says:</div></Row>
							<Row><div style={styleCSS.surveyNoteText}>{note.text}</div><br /></Row>
						</Col>
						<Col md={1} lg={1} style={this.state.active ? styleCSS.noteItemSelected : styleCSS.noteItemDeselected}>
							<div>
								{this.state.active &&
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