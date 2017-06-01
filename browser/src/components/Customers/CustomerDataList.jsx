// Wrapper class for customer data array of objects
import { FormatPhoneNumber } from '../Utils/Utils';

const CUSTOMER_STATUS = ['new customer', 'customer called, pending call back', 'survey scheduled', 'survey in progress', 'estimate in queue', 'estimate accepted', 'estimate sent'];
const SURVEY_TYPES = ['Online', 'On-site'];

const customerFieldNames = {
  ID: 'id',
  FULL_NAME: 'fullName',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ADDRESS: 'address',
  EMAIL1: 'email1',
  EMAIL1NOTIFY: 'email1Notification',
  EMAIL2: 'email2',
  EMAIL2NOTIFY: 'email2Notification',
  CPHONE: 'cphone',
  WPHONE: 'wphone',
  HPHONE: 'hphone',
  STATUS: 'status',
  SURVEYOR_NAME: 'surveyorName',
  SURVEY_TYPE: 'surveyType',
  ESTIMATOR_NAME: 'estimatorName',
};

class CustomerDataList {
  constructor(data) {
    // accepts a customer data array
    this.data = data;
  }

  getSize() {
    return this.data.length;
  }

  // This function provides a mapping from the nested customers object to a unique set of 'col' identifiers
  // (so that the data structure appears flat). Also maps enum values to strings, and checks for null values.
  getDataAt(index, col) {
    const fields = customerFieldNames;
    switch (col) {
      case fields.ID:
      case fields.FIRST_NAME:
      case fields.LAST_NAME:
      case fields.ADDRESS:
      case fields.EMAIL1:
      case fields.EMAIL2:
        return this.data[index][col] ? this.data[index][col] : '';
      case fields.CPHONE:
      case fields.WPHONE:
      case fields.HPHONE:
        return this.data[index][col] ? FormatPhoneNumber(this.data[index][col]) : '';
      case fields.FULL_NAME: {
        let fullName = '';
        if (this.data[index].firstName) {
          fullName += this.data[index].firstName;
        }
        if (this.data[index].lastName) {
          fullName += ' ';
          fullName += this.data[index].lastName;
        }
        return fullName;
      }
      case fields.EMAIL1NOTIFY:
      case fields.EMAIL2NOTIFY:
        return this.data[index][col] ? 'Yes' : 'No';
      case fields.STATUS:
        return (this.data[index][col] && CUSTOMER_STATUS[this.data[index][col]]) ? CUSTOMER_STATUS[this.data[index][col]] : '';
      case fields.SURVEY_TYPE:
        return (this.data[index][col] && SURVEY_TYPES[this.data[index][col]]) ? SURVEY_TYPES[this.data[index][col]] : '';
      case fields.SURVEYOR_NAME: {
        let surveyorName = '';
        if (this.data[index].surveyor.firstName) {
          surveyorName += this.data[index].surveyor.firstName;
        }
        if (this.data[index].surveyor.lastName) {
          surveyorName += ' ';
          surveyorName += this.data[index].surveyor.lastName;
        }
        return surveyorName;
      }
      case fields.ESTIMATOR_NAME:
        return this.data[index].estimator ? this.data[index].estimator : '';
      default:
        return this.data[index][col] ? this.data[index][col] : '';
    }
  }
}

export { CustomerDataList, customerFieldNames, CUSTOMER_STATUS, SURVEY_TYPES };
