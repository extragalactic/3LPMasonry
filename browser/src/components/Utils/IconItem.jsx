import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';

const buttonStyles = { NORMAL: 0, RADIO: 1 };

IconItem.propTypes = {
  iconType: PropTypes.func.isRequired,
  buttonStyle: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
  param: PropTypes.any,
  radioFunc: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  iconStyle: PropTypes.object.isRequired,
};

function IconItem(props) {
  const IconType = props.iconType;

  const onClick = () => {
    if (props.buttonStyle === buttonStyles.RADIO) {
      props.radioFunc(props.index);
    }

    if (props.param) {
      return props.func(props.param);
    }
    return props.func();
  };

  return (
    <IconButton
      onTouchTap={onClick}
      iconStyle={props.iconStyle}
      style={props.iconStyle}
      disabled={false}
    >
      <IconType />
    </IconButton>
  );
}

export { IconItem, buttonStyles };
