import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

import styleCSS from '../../styles/customerDetailsStyles';

WarningMessage.propTypes = {
	message: React.PropTypes.string.isRequired,
};

function WarningMessage(props) {
	return (
		<div>
			<Row>
				<Col>
					<WarningIcon color={'#FFEB3B'} style={{ width: 50, height: 50 }} />
				</Col>
				<Col>
					<div style={styleCSS.warningMessage}>{props.message}</div>
				</Col>
			</Row>
		</div>
	);
}

export default WarningMessage;
