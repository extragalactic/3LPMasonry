import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table-2';
import Dimensions from 'react-dimensions';
import styles from 'style-loader!css-loader!fixed-data-table/dist/fixed-data-table.css';

import { CustomerDataList, customerFieldNames } from './CustomerDataList';
import styleCSS from '../../styles/customerTableStyles';


const fields = customerFieldNames;
const SEARCHABLE_COLUMNS = [fields.FIRST_NAME, fields.LAST_NAME, fields.ADDRESS, fields.STATUS, fields.EMAIL1, fields.EMAIL2, fields.WPHONE, fields.CPHONE, fields.HPHONE, fields.SURVEY_TYPE, fields.SURVEYOR_NAME, fields.ESTIMATOR_NAME];
const ROW_HEIGHT = 70;
const HEADER_HEIGHT = 50;
const columnWidths = {
  name: 160,
  address: 180,
  phone: 130,
  email: 220,
  emailNotify: 80,
  status: 130,
  surveyType: 70,
  notes: 400,
};

const TextCell = ({ rowIndex, data, col, activeRow = -1, ...props }) => (
  <Cell
    style={rowIndex === activeRow ? { ...styleCSS.cellStyle, ...styleCSS.cellHighlight } : styleCSS.cellStyle}
    {...props}
  >
    {data.getDataAt(rowIndex, col)}
  </Cell>
);
TextCell.propTypes = {
  rowIndex: PropTypes.number,
  data: PropTypes.object.isRequired,
  col: PropTypes.string.isRequired,
  activeRow: PropTypes.number.isRequired,
};
TextCell.defaultProps = {
  rowIndex: 0,
};


const HeaderCell = ({ title }) => (
  <Cell style={styleCSS.headerCellStyle}>
    {title}
  </Cell>
);
HeaderCell.propTypes = {
  title: PropTypes.string.isRequired,
};


class DataListWrapper {
  constructor(data, indexMap) {
    this.data = data;
    this.indexMap = indexMap;
  }

  getSize() {
    return this.indexMap.length;
  }

  getDataAt(index, col) {
    return this.data.getDataAt(this.indexMap[index], col);
  }
}


class _CustomersTable extends React.Component {
  static propTypes = {
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    saveCustomerID: PropTypes.func.isRequired,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.dataList = new CustomerDataList(props.customers);
    this.state = {
      filteredDataList: this.dataList,
      activeRow: -1,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onRowMouseEnter = this.onRowMouseEnter.bind(this);
    this.onRowMouseLeave = this.onRowMouseLeave.bind(this);
  }

  onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this.dataList,
      });
    }
    const filterBy = e.target.value.toLowerCase();
    const size = this.dataList.getSize();
    const filteredIndexes = [];

    // look in all searchable fields (columns) for input string
    for (let index = 0; index < size; index += 1) {
      for (let j = 0; j < SEARCHABLE_COLUMNS.length; j += 1) {
        const val = this.dataList.getDataAt(index, SEARCHABLE_COLUMNS[j]);
        if (val && val.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
          break;
        }
      }
    }
    this.setState({
      filteredDataList: new DataListWrapper(this.dataList, filteredIndexes)
    });
  }

  onRowMouseEnter(e, index) {
    this.setState({ activeRow: index });
  }

  onRowMouseLeave() {
    this.setState({ activeRow: -1 });
  }

  onRowClick(e, index) {
    // save selected customer ID, then goto CustomerDetails page
    this.props.saveCustomerID(this.state.filteredDataList.getDataAt(index, 'id'));
    browserHistory.push('details');
  }

  render() {
    const { filteredDataList } = this.state;
    const { activeRow } = this.state;
    // the following props are passed in via react-dimensions
    const { containerHeight, containerWidth } = this.props;

    return (
      <div style={styleCSS.tableStyle} >
        <div style={{ display: 'inlineBlock' }}>
          <div style={styleCSS.title}>
            <span>Customer List</span>
          </div>
          <div>
            <input
              style={styleCSS.inputBox}
              onChange={this.onFilterChange}
              placeholder="Enter Search Text"
            />
            <br />
          </div>
        </div>

        <Table
          rowHeight={ROW_HEIGHT}
          rowsCount={filteredDataList.getSize()}
          width={containerWidth}
          height={(filteredDataList.getSize() * ROW_HEIGHT) + HEADER_HEIGHT + 20 < containerHeight ?
                  (filteredDataList.getSize() * ROW_HEIGHT) + HEADER_HEIGHT + 20 :
                  containerHeight
          }
          headerHeight={HEADER_HEIGHT}
          onRowMouseEnter={this.onRowMouseEnter}
          onRowMouseLeave={this.nRowMouseLeave}
          onRowClick={this.onRowClick}
          {...this.props}
        >
          <Column
            header={<HeaderCell title={'Name'} />}
            cell={<TextCell data={filteredDataList} col={fields.FULL_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
            fixed
          />

          <Column
            header={<HeaderCell title={'Status'} />}
            cell={<TextCell data={filteredDataList} col={fields.STATUS} activeRow={activeRow} />}
            width={columnWidths.status}
          />

          <Column
            header={<HeaderCell title={'Address'} />}
            cell={<TextCell data={filteredDataList} col={fields.ADDRESS} activeRow={activeRow} />}
            width={columnWidths.address}
          />

          <Column
            header={<HeaderCell title={'Email 1'} />}
            cell={<TextCell data={filteredDataList} col={fields.EMAIL1} activeRow={activeRow} />}
            width={columnWidths.email}
          />

          <Column
            header={<HeaderCell title={'Email 1 Notify'} />}         
            cell={<TextCell data={filteredDataList} col={fields.EMAIL1NOTIFY} activeRow={activeRow} />}
            width={columnWidths.emailNotify}
          />

          <Column
            header={<HeaderCell title={'Email 2'} />}
            cell={<TextCell data={filteredDataList} col={fields.EMAIL2} activeRow={activeRow} />}
            width={columnWidths.email}
          />

          <Column
            header={<HeaderCell title={'Email 2 Notify'} />}
            cell={<TextCell data={filteredDataList} col={fields.EMAIL2NOTIFY} activeRow={activeRow} />}
            width={columnWidths.emailNotify}
          />

          <Column
            header={<HeaderCell title={'Cell Phone'} />}
            cell={<TextCell data={filteredDataList} col={fields.CPHONE} activeRow={activeRow} />}
            width={columnWidths.phone}
          />

          <Column
            header={<HeaderCell title={'Work Phone'} />}
            cell={<TextCell data={filteredDataList} col={fields.WPHONE} activeRow={activeRow} />}
            width={columnWidths.phone}
          />

          <Column
            header={<HeaderCell title={'Home Phone'} />}
            cell={<TextCell data={filteredDataList} col={fields.HPHONE} activeRow={activeRow} />}
            width={columnWidths.phone}
          />

          <Column
            header={<HeaderCell title={'Survey Type'} />}
            cell={<TextCell data={filteredDataList} col={fields.SURVEY_TYPE} activeRow={activeRow} />}
            width={columnWidths.surveyType}
          />

          <Column
            header={<HeaderCell title={'Surveyor Name'} />}
            cell={<TextCell data={filteredDataList} col={fields.SURVEYOR_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
          />

          <Column
            header={<HeaderCell title={'Estimator Name'} />}
            cell={<TextCell data={filteredDataList} col={fields.ESTIMATOR_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
          />
        </Table>
      </div>
    );
  }
}

const mapActionsToProps = dispatch => ({
  saveCustomerID(userID) {
    dispatch({ type: 'SAVE_CUSTOMER', payload: userID });
  },
});
const CustomersTable = connect(null, mapActionsToProps)(_CustomersTable);

module.exports = Dimensions({
  getHeight() {
    return window.innerHeight - 200;
  },
  getWidth() {
    const widthOffset = 40;
    return window.innerWidth - widthOffset;
  },
})(CustomersTable);
