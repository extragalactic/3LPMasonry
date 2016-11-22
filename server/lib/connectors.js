import _ from 'lodash';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
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


class Users {
  constructor() {
    this.findUsers = () => {
       const users = UsersModel.find((error, data) => {
        return data;
      });
      return users;
    };
  }
}

class Address {
  constructor() {
    this.findAddress = ({searchTerm}) => {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=geocode&components=country:ca&language=en&key=AIzaSyCRy96pXXmdiU4coVd23pxdBWeLmC8oIn0`
      const address =  axios.get(url).then((data) => {
        return data.data.predictions.map((prediction) => {
          return { description :prediction.description }
         })
       }).catch((error) => {
         console.log(error)
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

class UpdateUser {
  constructor() {
    this.updateUser = (args) => {
      const id = args.id
      delete args.id
   const User = UsersModel.findOneAndUpdate({_id: id}, args)
      .then((user) => {
       return user
    })
    return User
    };
  }
}




module.exports = { Customers, Customer, NewCustomer, UpdateCustomer, Address, Users, UpdateUser };
