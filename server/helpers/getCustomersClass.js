import UsersModel from '../lib/UserModel';
import QueueModel from '../lib/queueModel';

class GetCustomersClass {
  constructor(user) {
    this.user = user;
  }

  getQueue() {
    const queue = new Promise((resolve, reject) => {
      const all = QueueModel.find().then((q) => {
        return q.map(customer => customer);
      });
      resolve(all);
    });
    return queue;
  }

  getMyCustomers() {
    const customers = new Promise((resolve, reject) => {
      UsersModel.findOne({ _id: this.user })
           .then((user) => {
             const SurveyCustomers =  user.newCustomers.reduce((result, currentCustomer) => {
               if (currentCustomer.status === 0) {
                 result.newcustomers.push(currentCustomer);
               }
               if (currentCustomer.status === 1) {
                 result.followup.push(currentCustomer);
               }
               if (currentCustomer.status === 2) {
                 result.onsite.push(currentCustomer);
               }
               if (currentCustomer.status === 3) {
                 result.inprogress.push(currentCustomer);
               }
               if (currentCustomer.status === 4) {
                 result.surveycomplete.push(currentCustomer);
               }
               return result;
             }, {
               newcustomers: [],
               followup: [],
               onsite: [],
               inprogress: [],
               surveycomplete: [],
               myestimates: [],
               estimatequeue: [],
               estimatefollowup: [],
               estimatesent: [],
             });
             const combined = user.estimates.reduce((result, currentCustomer) => {
               if (currentCustomer.status === 0) {
                 result.myestimates.push(currentCustomer);
               }
               if (currentCustomer.status === 1) {
                 result.estimatefollowup.push(currentCustomer);
               }
               if (currentCustomer.status === 2) {
                 result.estimatesent.push(currentCustomer);
               }
               return result;
             }, SurveyCustomers);
             this.getQueue().then((res) => {
               combined.estimatequeue = res;
               resolve(combined);
             });
           });
    });
    return customers;
  }
}

export default GetCustomersClass;
