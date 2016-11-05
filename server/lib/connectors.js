import CustomersModel from '../lib/models'

class Customers {
  constructor() {
    this.findCustomers = () => {
      const customers = CustomersModel.find((error, data) => {
        return data;
      });
      console.log(customers);
      return customers;
    };
  }
}



module.exports = { Customers };
