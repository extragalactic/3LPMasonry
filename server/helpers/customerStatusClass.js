import _ from 'lodash';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import QueueModel from '../lib/queueModel';

class CustomerStatus {
  constructor(customer, user) {
    this.customer = customer;
    this.user = user;
  }

  setEstimatorName() {
    UsersModel.findOne({ _id: this.user })
     .then((user) => {
       CustomersModel({ _id: this.customer })
          .then((customer) => {
            customer.estimator = `${user.firstName} ${user.lastName}`;
            customer.save();
          });
     });
  }

  getCustomer() {
    const customerObj = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer })
          .then(customer => resolve(customer));
    });
    return customerObj;
  }
  addCustomertoUserList() {
    UsersModel.findOne({ _id: this.user })
        .then((user) => {
          this.getCustomer()
             .then((customer) => {
               user.estimates.push({
                 id: customer._id,
                 firstName: customer.firstName,
                 lastName: customer.lastName,
                 email1: customer.email1,
                 email2: customer.email2,
                 hphone: customer.hphone,
                 cphone: customer.cphone,
                 wphone: customer.wphone,
                 address: customer.address,
                 status: 0,
               });
               user.save();
             });
        });
  }

  removeCustomerfromQueue() {
    this.getCustomer()
      .then((customer) => {
        QueueModel.findByIdAndRemove(customer.estimateQueueId)
          .then(data => console.log(data)).catch(err => console.error(err));
        CustomersModel.findOne({ _id: customer.id })
         .then((cust) => {
           cust.estimateQueueId = '';
           cust.save();
         });
      });
  }
  checkifExist() {
    const results = new Promise((resolve, reject) => {
      UsersModel.findOne({ _id: this.user })
           .then((user) => {
             let res = false;
              user.estimates.forEach((estimate) => {
                if (estimate.id === this.customer) {
                    res = true;
                }
              });
          resolve(res)

           });
    });
    return results;
  }

  acceptEstimate() {
    this.checkifExist()
    .then((results) => {
      console.log('check', results)
      if (!results) {
        this.addCustomertoUserList();
        this.removeCustomerfromQueue();
        this.setEstimatorName();
      } else {
        this.removeCustomerfromQueue();
      }
    });
  }
}


export default CustomerStatus;
