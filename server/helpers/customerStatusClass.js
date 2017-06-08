import _ from 'lodash';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import QueueModel from '../lib/queueModel';
import OneSignalClass from './oneSignalClass';

class CustomerStatus {
  constructor(customer, user) {
    this.customer = customer;
    this.user = user;
  }

  getCustomer() {
    const customerObj = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer })
          .then(customer => resolve(customer));
    });
    return customerObj;
  }

  getUser() {
    const userObj = new Promise((resolve, reject) => {
      UsersModel.findOne({ _id: this.customer })
          .then(customer => resolve(customer));
    });
    return userObj;
  }

 getEstimateStatus(status) {
   if(status === 0) {
     return 5;
   }
    if (status === 1) {
      return 6;
    }
    if (status === 2) {
      return 7;
    }
    if (status === 3) {
      return 8;
    }
  }

  getSurveyor() {
    const surveyor = new Promise((resolve, reject) => {
      UsersModel.findOne({ _id: this.user })
       .then((user) => {
         resolve({
           firstName: user.firstName,
           lastName: user.lastName,
           mobile: user.mobile,
           id: user._id,
         });
       });
    });
    return surveyor;
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
  removeCustomerfromEstimate() {
    this.getCustomer.then((customer) => {
      UsersModel.findOne({ _id: this.user })
      .then((user) => {
        user.estimates = user.estimates.filter((cust) => {
          return !cust.id === this.customer;
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
        this.setCustomerStatus(5);
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

  setStatusEstimator(status) {
    UsersModel.findOne({ _id: this.user })
       .then((user) => {
          user.estimates = user.estimates.map((cust) => {
            if(cust.id === this.customer) {
              cust.status = status;
              return cust;
            }
            return cust;
          })
          user.save();
       });
          CustomersModel.findOne({ _id: this.customer })
        .then((customer) => {
         customer.status = this.getEstimateStatus(status);
          customer.save();
        });
  }

  setEstimatorName() {
    this.getUser()
      .then((user) => {
         CustomersModel.findOne({ _id: this.user })
           .then((customer) => {
             customer.estimator = `${user.firstName} ${user.lastName}`;
             customer.estmatorID = user._id;
             customer.save();
           });
      });
  }

  setsurveyType(type) {
    CustomersModel.findOne({_id: this.customer})
      .then((customer) => {
        customer.surveyType = type;
        customer.save();
      });
  }

  setSurveyorforCustomer() {
    this.getSurveyor()
       .then((surveyor) => {
         CustomersModel.findOne({ _id: this.customer })
           .then((customer) => {
             customer.surveyor = surveyor;
             customer.save();
           });
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
    this.setSurveyorforCustomer();
    this.setsurveyType(1);
  }

  addCustomertoEstimator() {
    CustomersModel.findOne({ _id: this.customer })
       .then((customer) => {
         UsersModel.findOne({ _id: this.user })
          .then((user) => {
            user.estimates.push({
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
 addCustomertoQueue () {
   this.getCustomer()
    .then((customer) => {
      QueueModel.findOne({ customer: customer._id })
      .then((data) => {
        if (data === null) {
          const queueItem = new QueueModel({
            id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email1: customer.email1,
            email2: customer.email2,
            hphone: customer.hphone,
            cphone: customer.cphone,
            wphone: customer.wphone,
            address: customer.address,
          });
          queueItem.save().then((res) => {
            CustomersModel.findOne({ _id: customer._id })
             .then((customer) => {
               customer.estimateQueueId = res._id;
               customer.save();
             });
          });
        }
      });
    });
 }

  deleteCustomerfromSurveyor() {
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
  deleteCustomerfromEstimator() {
    UsersModel.findOne({ _id: this.user })
      .then((user) => {
          user.estimates.forEach((customer, index) => {
            if (customer.id === this.customer) {
              user.estimates.splice(index, 1);
              user.save();
            }
          });
      });
  }

  checkCustomerStatus() {
    const CustStatus = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer }).then((customer) => { resolve(customer.status); });
    });
    const SurveyorStatus = new Promise((resolve, reject) => {
      UsersModel.findOne({ _id: this.user }).then((user) => {
        user.newCustomers.forEach((customer) => {
          if (customer.id === this.customer) {
            resolve(customer.status);
          }
        });
      });
    });
    const EstimatorStatus = new Promise((resolve, reject) => {
      UsersModel.findOne({ _id: this.user }).then((user) => {
        if (user.estimates.length === 0) {
          resolve(false);
        }
        user.estimates.forEach((customer) => {
          if (customer.id === this.customer) {
            resolve(customer.status);
          }
          resolve(false);
        });
      });
    });
    return Promise.all([CustStatus, SurveyorStatus, EstimatorStatus]);
  }

 removeCustomerfromQueue() {
   this.getCustomer().then((customer) => {
         QueueModel.findByIdAndRemove(customer.estimateQueueId)
          .then(data => console.log(data)).catch(err => console.error(err));
     });
 }

checkCustomerinQueue(){
  const status = new Promise((resolve, reject) => {
    QueueModel.findOne({ id: this.customer })
     .then((customer) => {
       if(customer){
         resolve(true);
       }
       resolve(false);
     })
     .catch(() => { resolve(false) });
  });
  return status;
}


  setCustomerStatus(status) {
    CustomersModel.findOne({ _id: this.customer })
       .then((customer) => {
         customer.status = status;
         customer.save();
       });
  }

  setSurveyReadyforPricing(status) {
    CustomersModel.findOne({ _id: this.customer })
       .then((customer) => {
         customer.surveyReadyforPrice = status;
         customer.save();
       });
  }
  sendPushNotifcationtoEstimators() {
    this.getCustomer()
       .then((customer) => {
         const oneSignal = new OneSignalClass(this.user, customer);
         oneSignal.sendPushtoEstimators();
       });
  }

  sendPushToEstimator() {
    CustomersModel.findOne({ _id: this.customer })
       .then((customer) => {
         const oneSignal = new OneSignalClass(null, customer);
         oneSignal.sendPushtoEstimators();
       });
  }

  toogleCustomerReady() {
    this.checkCustomerStatus()
      .then((status) => {
        const customerStatus = {
          cust: status[0],
          survey: status[1],
          est: status[2],
        };
        if (customerStatus.cust <= 3 && customerStatus.survey <= 3) {
          this.setStatusSurveyor(4);
          this.setSurveyReadyforPricing(true);
          this.addCustomertoQueue();
          this.sendPushNotifcationtoEstimators();
        }
        if (customerStatus.survey === 4) {
          this.checkCustomerinQueue()
          .then((res) => {
            if (res) {
              this.removeCustomerfromQueue();
              this.setSurveyReadyforPricing(false);
              this.setStatusSurveyor(3);
            } else {
              this.deleteCustomerfromEstimator();
              this.setSurveyReadyforPricing(false);
              this.setStatusSurveyor(3);
            }
          });
        }
      });
  }
}

export default CustomerStatus;
