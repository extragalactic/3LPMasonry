import React from 'react';
import PropTypes from 'prop-types';

import { IconItem } from './IconItem';


class IconBar extends React.Component {
  static propTypes = {
    iconGroupData: PropTypes.object.isRequired,
    iconWidth: PropTypes.number.isRequired,
    funcList: PropTypes.arrayOf(PropTypes.func).isRequired,
  };
  constructor(props) {
    super(props);
    this.setRadioSelection = this.setRadioSelection.bind(this);
  }

  setRadioSelection(activeIndex) {
    this.props.iconGroupData.radioSelected = this.props.iconGroupData.radioSelected.map((val, index) => {
      return index === activeIndex;
    });
  }

  iconStyles(colour = '#000', selected = false) {
    return (
    {
      iconContainer: {
        borderStyle: 'solid',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: selected ? '#0f0' : '#fff',
        width: `${this.props.iconWidth * 0.95}vh`,
        height: `${this.props.iconWidth}vh`,
        paddingTop: `${this.props.iconWidth / 20}vh`,
        paddingBottom: `${this.props.iconWidth / 20}vh`,
        marginLeft: `${this.props.iconWidth / 30}vh`,
      },
      iconButton: {
        flex: 1,
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        color: colour,
      },
    }
    );
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        {
          this.props.iconGroupData.icons.map((icon, index) => {
            const iconType = icon.type;
            // if only a single callback function is provided for a group larger than one, use the same function for each icon
            const funcIndex = this.props.iconGroupData.icons.length === this.props.funcList.length ? index : 0;
            const colour = icon.colour ? icon.colour : '#000';
            const radioSelect = this.props.iconGroupData.radioSelected ? this.props.iconGroupData.radioSelected[index] : false;
            const iconStyles = this.iconStyles(colour, radioSelect);
            return (
              <div style={iconStyles.iconContainer} key={icon.label}>
                <IconItem
                  iconType={iconType}
                  buttonStyle={this.props.iconGroupData.buttonStyle}
                  radioFunc={this.setRadioSelection}
                  index={index}
                  func={this.props.funcList[funcIndex]}
                  param={icon.param ? icon.param : null}
                  iconStyle={iconStyles.iconButton}
                  style={iconStyles.iconButton}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default IconBar;
