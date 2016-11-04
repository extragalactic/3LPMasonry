import CustomersModel from '../lib/models'

class Customers {
  constructor () {
    this.findCustomer = (firstName) => {
      const customer = CustomersModel.findOne({firstName}, (error, data) => {
        return data;
      });
      return customer;
    }
  }
}

module.exports = { Customers };