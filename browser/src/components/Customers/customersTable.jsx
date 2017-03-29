import React from 'react';
import { Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import { CustomerDataList, customerFieldNames } from './CustomerDataList';

import styles from 'style-loader!css-loader!fixed-data-table/dist/fixed-data-table.css';
import styleCSS from '../../styles/customerTableStyles';

"use strict;"
const fields = customerFieldNames;
const SEARCHABLE_COLUMNS = [fields.FIRST_NAME, fields.LAST_NAME, fields.ADDRESS, fields.STATUS, fields.EMAIL1, fields.EMAIL2, fields.WPHONE, fields.CPHONE, fields.HPHONE, fields.SURVEY_TYPE, fields.SURVEYOR_NAME, fields.ESTIMATOR_NAME];

const columnWidths = {
  name: 110,
  address: 160,
  phone: 110,
  email: 200,
  emailNotify: 80,
  status: 130,
  surveyType: 70,
  notes: 400
};

const TextCell = ({rowIndex, data, col, activeRow=-1, ...props}) => (
  <Cell 
    style={ rowIndex===activeRow ? {...styleCSS.cellStyle, ...styleCSS.cellHighlight} : styleCSS.cellStyle } 
    {...props}
  >
      {data.getDataAt(rowIndex, col)}
  </Cell>
);

const HeaderCell = ({title, ...props}) => (
  <Cell style={styleCSS.headerCellStyle}>
    {title}
  </Cell>
);


class DataListWrapper {
  constructor(data, indexMap) {
    this.data = data;
    this.indexMap = indexMap;    
  }

  getSize() {
    return this.indexMap.length;
  }

  getDataAt(index, col) {
    return this.data.getDataAt( this.indexMap[index], col );
  }
}

  
class _CustomersTable extends React.Component {
  constructor(props) {
    super(props);

    this.dataList = new CustomerDataList(props.customers);
    this.state = {
      filteredDataList : this.dataList,
      activeRow : -1
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onRowMouseEnter = this.onRowMouseEnter.bind(this);
    this.onRowMouseLeave = this.onRowMouseLeave.bind(this);
  }

  onFilterChange(e) {
     if (!e.target.value) {
      this.setState({
        filteredDataList: this.dataList
      });
    }
    const filterBy = e.target.value.toLowerCase();
    const size = this.dataList.getSize();
    const filteredIndexes = [];

    // look in all searchable fields (columns) for input string
    for (let index = 0; index < size; index++) {
      for (let j = 0; j < SEARCHABLE_COLUMNS.length; j++) {
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
    this.setState({activeRow: index});
  }

  onRowMouseLeave(e, index) {
    this.setState({activeRow: -1});
  }

  onRowClick(e, index) {
    // save selected customer ID, then goto CustomerDetails page
    this.props.saveCustomerID( this.state.filteredDataList.getDataAt(index, 'id') );
    browserHistory.push('details'); 
  }

  render() {
    const {filteredDataList} = this.state;
    const {activeRow} = this.state;

    return (
      <div>

      <div style={styleCSS.tableStyle}>
        <input style={styleCSS.inputBox}
          onChange={this.onFilterChange}
          placeholder="Enter Search Text"
        />
        <br />

        <Table
          rowHeight={70}
          rowsCount={filteredDataList.getSize()}
          width={1800}
          height={900}
          headerHeight={50}
          onRowMouseEnter={this.onRowMouseEnter}
          onRowMouseLeave={this.nRowMouseLeave}
          onRowClick={this.onRowClick}
          {...this.props}
        >
          <Column
            header={<HeaderCell title={"First Name"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.FIRST_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
          />

          <Column
            header={<HeaderCell title={"Last Name"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.LAST_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
          />

          <Column
            header={<HeaderCell title={"Status"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.STATUS} activeRow={activeRow} />}
            width={columnWidths.status}
          />

          <Column
            header={<HeaderCell title={"Address"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.ADDRESS} activeRow={activeRow} />}
            width={columnWidths.address}
          />

          <Column
            header={<HeaderCell title={"Email 1"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.EMAIL1} activeRow={activeRow} />}
            width={columnWidths.email}
          />

          <Column
            header={<HeaderCell title={"Email 1 Notify"}></HeaderCell>}            
            cell={<TextCell data={filteredDataList} col={fields.EMAIL1NOTIFY} activeRow={activeRow} />}
            width={columnWidths.emailNotify}
          />

          <Column
            header={<HeaderCell title={"Email 2"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.EMAIL2} activeRow={activeRow} />}
            width={columnWidths.email}
          />

          <Column
            header={<HeaderCell title={"Email 2 Notify"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.EMAIL2NOTIFY} activeRow={activeRow} />}
            width={columnWidths.emailNotify}
          />

          <Column
            header={<HeaderCell title={"Cell Phone"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.CPHONE} activeRow={activeRow} />}
            width={columnWidths.phone}
          />

          <Column
            header={<HeaderCell title={"Work Phone"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.WPHONE} activeRow={activeRow} />}
            width={columnWidths.phone}
          />

          <Column
            header={<HeaderCell title={"Home Phone"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.HPHONE} activeRow={activeRow} />}
            width={columnWidths.phone}
          />

          <Column
            header={<HeaderCell title={"Survey Type"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.SURVEY_TYPE} activeRow={activeRow} />}
            width={columnWidths.surveyType}
          />

          <Column
            header={<HeaderCell title={"Surveyor Name"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.SURVEYOR_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
          />

          <Column
            header={<HeaderCell title={"Estimator Name"}></HeaderCell>}
            cell={<TextCell data={filteredDataList} col={fields.ESTIMATOR_NAME} activeRow={activeRow} />}
            width={columnWidths.name}
          />

        </Table>

      </div>

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

export default CustomersTable;