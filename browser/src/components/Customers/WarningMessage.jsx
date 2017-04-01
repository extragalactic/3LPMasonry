import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

export default (props) => {
		return (
			<div>
				<Row>
					<Col>
						<WarningIcon color={"#FFEB3B"} style={{width:50, height:50}} />
					</Col>
					<Col>
						<div style={{marginTop:18, marginLeft:10}}>{props.message}</div>
					</Col>
				</Row> 
			</div> 		
		);
}
