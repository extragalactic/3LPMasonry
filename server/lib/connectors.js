import _ from 'lodash';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import axios from 'axios';
import { sendSMStoSurveyor, sendSMStoCustomer } from '../methods/twilio';
import { sendEmailSurveytoCustomer } from '../methods/sendInBlue';

class Customers {
    constructor () {
        this.findCustomers = () => {
            const customers = CustomersModel.find((error, data) => {
                return data;
            });
            return customers;
        };
    }
}

class Customer {
    constructor () {
        this.findCustomer = ({ id }) => {
            const customer = CustomersModel.findOne({ _id: id }, (error, data) => {
                return data;
            });
            return customer;
        };
    }
}

class GetCustomer {
    constructor () {
        this.getCustomer = ({ id }) => {
            const customer = CustomersModel.findOne({ _id: id }, (error, data) => {
                return data;
            });
            return customer;
        };
    }
}

class Users {
    constructor () {
        this.findUsers = () => {
            const users = UsersModel.find((error, data) => {
                return data;
            });
            return users;
        };
    }
}

class Surveyors {
    constructor () {
        this.findSurveyors = () => {
            const surveyors = UsersModel.find({ surveyor: true }, (error, users) => {
                return users;
            });
            return surveyors;
        };
    }
}

class Address {
    constructor () {
        this.findAddress = ({ searchTerm }) => {
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=geocode&components=country:ca&language=en&key=AIzaSyCRy96pXXmdiU4coVd23pxdBWeLmC8oIn0`;
            const address = axios.get(url).then((data) => {
                return data.data.predictions.map((prediction) => {
                    return { description: prediction.description };
                });
            }).catch((error) => {
                console.log(error);
            });
            return address;
        };
    }
}

class NewCustomer {
    constructor () {
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
                status
            });
            newCustomer.save();
            return newCustomer;
        };
    }
}
class UpdateCustomer {
    constructor () {
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
                status
            };

            const changedData = {};
            _.each(payload, (value, key) => {
                if (value !== undefined) {
                    changedData[key] = value;
                }
            });
            const Customer = CustomersModel.findOneAndUpdate({ _id: id }, changedData)
        .then((customer) => {
            return customer;
        });
            return Customer;
        };
    }
}

class UpdateUser {
    constructor () {
        this.updateUser = (args) => {
            const id = args.id;
            delete args.id;
            const User = UsersModel.findOneAndUpdate({ _id: id }, args)
      .then((user) => {
          return user;
      });
            return User;
        };
    }
}

class UpdateDispatchInfo {
    constructor () {
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
                   customer.save();
                   return customer;
               });
            return Customer;
        };
    }
}

class SubmitCustomer {
    constructor () {
        this.submitCustomer = (args) => {
            const Customer = CustomersModel.findOne({ _id: args.id })
             .then((data) => {
                 if (data.sendSurvey) {
                     sendSMStoSurveyor(data);
                     if (data.cellNotification) {
                         sendSMStoCustomer({ number: data.cphone, data: data });
                     }
                     if (data.homeNotification) {
                         sendSMStoCustomer({ number: data.hphone, data: data });
                     }
                     if (data.workNotification) {
                         sendSMStoCustomer({ number: data.wphone, data: data });
                     }
                     if (data.email1Notification) {
                         sendEmailSurveytoCustomer({ email: data.email1, data: data });
                     }
                     if (data.email2Notification) {
                         sendEmailSurveytoCustomer({ email: data.email2, data: data });
                     }
                 }
                 if (data.surveyor) {
                     sendSMStoSurveyor(data);
                 }
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
    SubmitCustomer
};
