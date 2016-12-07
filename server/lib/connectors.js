import _ from 'lodash';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import axios from 'axios';
import { sendSMStoSurveyor, sendSMStoCustomer } from '../methods/twilio';
import { sendEmailSurveytoCustomer } from '../methods/sendInBlue';
import { setMapsLocation } from '../methods/googleMaps';

// 0: New Customer, Inquiry no survery
// 1: New Customer, Online Survey sent
// 2: Customer, Online Survey Received
// 3: Customer, Sent to Surveyor
// 4: Surveyor made contact, followup required
// 5: Onsite visit Scheduled
// 6: Onsite Survey Complete

class Customers {
  constructor() {
    this.findCustomers = () => {
      const customers = CustomersModel.find((error, data) => data);
      return customers;
    };
  }
}

class Customer {
  constructor() {
    this.findCustomer = ({ id }) => {
      const customer = CustomersModel.findOne({ _id: id }, (error, data) => data);
      return customer;
    };
  }
}

class GetCustomer {
  constructor() {
    this.getCustomer = ({ id }) => {
      const customer = CustomersModel.findOne({ _id: id }, (error, data) => data);
      return customer;
    };
  }
}

class Users {
  constructor() {
    this.findUsers = () => {
      const users = UsersModel.find((error, data) => data);
      return users;
    };
  }
}

class Surveyors {
  constructor() {
    this.findSurveyors = () => {
      const surveyors = UsersModel.find({ surveyor: true }, (error, users) => users);
      return surveyors;
    };
  }
}

class Address {
  constructor() {
    this.findAddress = ({ searchTerm }) => {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=geocode&components=country:ca&language=en&key=AIzaSyCRy96pXXmdiU4coVd23pxdBWeLmC8oIn0`;
      const address = axios.get(url).then(data => data.data.predictions.map(prediction => ({ description: prediction.description }))).catch((error) => {
        console.log(error);
      });
      return address;
    };
  }
}

class NewCustomer {
  constructor() {
    this.submitCustomer = ({
      firstName,
      lastName,
      email1,
      email2,
      hphone,
      cphone,
      wphone,
      address,
      notes,
      surveyor,
      estimator,
      status }) => {
      const newCustomer = new CustomersModel({
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status,
      });
      newCustomer.save();
      return newCustomer;
    };
  }
}
class UpdateCustomer {
  constructor() {
    this.updateCustomer = ({
      id,
      firstName,
      lastName,
      email1,
      email2,
      hphone,
      cphone,
      wphone,
      address,
      notes,
      surveyor,
      estimator,
      status }) => {
      const payload = {
        id,
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status,
      };

      const changedData = {};
      _.each(payload, (value, key) => {
        if (value !== undefined) {
          changedData[key] = value;
        }
      });
      const Customer = CustomersModel.findOneAndUpdate({ _id: id }, changedData)
        .then(customer => customer);
      return Customer;
    };
  }
}

class UpdateUser {
  constructor() {
    this.updateUser = (args) => {
      const id = args.id;
      delete args.id;
      const User = UsersModel.findOneAndUpdate({ _id: id }, args)
      .then(user => user);
      return User;
    };
  }
}

class UpdateDispatchInfo {
  constructor() {
    this.updateDispatchInfo = (args) => {
      const Customer = CustomersModel.findOne({ _id: args.id })
               .then((customer) => {
                 customer.email1Notification = args.dispatch.email1;
                 customer.email2Notification = args.dispatch.email2;
                 customer.cellNotification = args.dispatch.cphone;
                 customer.homeNotification = args.dispatch.hphone;
                 customer.workNotification = args.dispatch.wphone;
                 customer.address = args.dispatch.address;
                 customer.sendSurvey = args.dispatch.survey;
                 customer.surveyor = args.dispatch.surveyor;
                 setMapsLocation(customer);
                 customer.save();
                 return customer;
               });
      return Customer;
    };
  }
}

class SubmitCustomer {
  constructor() {
    this.submitCustomer = (args) => {
      const Customer = CustomersModel.findOne({ _id: args.id })
             .then((data) => {
               const surveyor = !data.surveyor.id ? true : false;
               const survey = !data.sendSurvey;
               const inquriy = survey && surveyor;
               if (data.sendSurvey === true) {
                 if (data.cellNotification) {
                   sendSMStoCustomer({ number: data.cphone, data });
                 }
                 if (data.homeNotification) {
                   sendSMStoCustomer({ number: data.hphone, data });
                 }
                 if (data.workNotification) {
                   sendSMStoCustomer({ number: data.wphone, data });
                 }
                 if (data.email1Notification) {
                   sendEmailSurveytoCustomer({ email: data.email1, data });
                 }
                 if (data.email2Notification) {
                   sendEmailSurveytoCustomer({ email: data.email2, data });
                 }
                 data.status = 1;
                 data.save();
               }
               if (!surveyor) {
                 sendSMStoSurveyor(data);
                 data.status = 3;
                 data.save();
               }
               if (inquriy) {
                 data.status = 0;
                 data.save();
               }
               // setMapsLocation(data);
               return data;
             });
      return Customer;
    };
  }
}

module.exports = {
  Customers,
  Customer,
  NewCustomer,
  UpdateCustomer,
  Address,
  Users,
  UpdateUser,
  Surveyors,
  GetCustomer,
  UpdateDispatchInfo,
  SubmitCustomer,
};
