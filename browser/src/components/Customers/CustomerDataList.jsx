
// Wrapper class for customer data array of objects

const CUSTOMER_STATUS = ['new customer', 'customer called, pending call back', 'survey scheduled', 'survey in progress', 'estimate in queue', 'estimate accepted', 'estimate sent'];
const SURVEY_TYPES = ['On-site', 'Online'];

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

	// This function provides a mapping from the nested customer object to a unique set of 'col' identifiers
	// (so that the data structure appears flat). Also maps enum values to strings.
	getDataAt(index, col) {
		const fields = customerFieldNames;
		switch (col) {
		case fields.ID:
		case fields.FIRST_NAME:
		case fields.LAST_NAME:
		case fields.ADDRESS:
		case fields.EMAIL1:
		case fields.EMAIL2:
		case fields.CPHONE:
		case fields.WPHONE:
		case fields.HPHONE:
			return this.data[index][col];
		case fields.FULL_NAME:
			return `${this.data[index].firstName} ${this.data[index].lastName}`;
		case fields.EMAIL1NOTIFY:
		case fields.EMAIL2NOTIFY:
			return this.data[index][col] ? 'Yes' : 'No';
		case fields.STATUS:
			return CUSTOMER_STATUS[this.data[index][col]];
		case fields.SURVEY_TYPE:
			return SURVEY_TYPES[0];  // <==== this is a placeholder value
		case fields.SURVEYOR_NAME:
			return this.data[index].surveyor.firstName;
		case fields.ESTIMATOR_NAME:
			return this.data[index].estimate.firstName;			
		default:
			return this.data[index][col];
		}
	}
}

export { CustomerDataList, customerFieldNames, CUSTOMER_STATUS, SURVEY_TYPES };
