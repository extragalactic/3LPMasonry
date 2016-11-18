import _ from 'lodash';
import CustomersModel from '../lib/models';
import axios from 'axios';

class Customers {
  constructor() {
    this.findCustomers = () => {
      const customers = CustomersModel.find((error, data) => {
        return data;
      });
      return customers;
    };
  }
}

class Customer {
  constructor() {
    this.findCustomer = ({id}) => {
      const customer = CustomersModel.findOne({_id: id},(error, data) => {
        return data;
      });
      return customer;
    };
  }
}

class Address {
  constructor() {
    this.findAddress = ({searchTerm}) => {
      console.log(searchTerm)
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=geocode&components=country:ca&language=en&key=AIzaSyAV9bOV85DqbVHdoesaHmUPK1jINZJW8lo`
      const address =  axios.get(url).then((data) => {
        return data.data.predictions.map((prediction) => {
          return { description :prediction.description }
         })
       })
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
        .then((customer) => {
          return customer;
        });
      return Customer;
    };
  }
}

module.exports = { Customers, Customer, NewCustomer, UpdateCustomer, Address };
