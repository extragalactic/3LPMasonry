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
             resolve(res);
           });
    });
    return results;
  }

  acceptEstimate() {
    this.checkifExist()
    .then((results) => {
      if (!results) {
        this.addCustomertoUserList();
        this.removeCustomerfromQueue();
        this.setEstimatorName();
      } else {
        this.removeCustomerfromQueue();
      }
    });
  }
  toggleStatus() {
    const status = new Promise((resolve, reject) => {
     let currentStatus = false;
      CustomersModel.findOne({ _id: this.customer })
      .then((customer) => {
      if (customer.status == 0) {
        customer.status = 1;
        currentStatus = true;
      } else if (customer.status == 1 || customer.status === 2) {
        customer.status = 0;
        currentStatus = false;
      }
      resolve(currentStatus);
      customer.save();
    });

    })

    UsersModel.findOne({ _id: this.user })
     .then((user) => {
       user.estimates = user.estimates.map((est) => {
         if (est.id == this.customer) {
           if (est.status == 0 ){
             est.status = 1;
          } else if (est.status == 1 || est.status == 2) {
            est.status = 0;
          }
           return est;
         }
         return est;
       });
       user.save();
     });
     return status;
  }

  setStatusSurveyor(status) {
    UsersModel.findOne({ _id: this.user })
       .then((user) => {
          user.newCustomers = user.newCustomers.map((cust) => {
            if(cust.id === this.customer){
              cust.status = status;
              return cust;
            }
            return cust;
          })
          user.save();
       });
      CustomersModel.findOne({_id: this.customer})
        .then((customer) => {
          customer.status = status;
          customer.save();
        });
  }
  dispatchCustomertoSurveyor() {
    CustomersModel.findOne({ _id: this.customer })
       .then((customer) => {
         UsersModel.findOne({ _id: this.user })
          .then((user) => {
            user.newCustomers.push({
              id: customer._id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              email1: customer.email1,
              email2: customer.email2,
              cphone: customer.cphone,
              hphone: customer.hphone,
              wphone: customer.wphone,
              address: customer.address,
              status: 0,
            });
            user.save();
          });
       });
  }
  deleteCustomerfromSurveyor(){
    UsersModel.findOne({ _id: this.user })
      .then((user) => {
          user.newCustomers.forEach((customer, index) => {
            if (customer.id === this.customer) {
              user.newCustomers.splice(index, 1);
              user.save();
            }
          });
      });
  }
}


export default CustomerStatus;
