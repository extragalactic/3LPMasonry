import CustomersModel from '../lib/CustomerModel';
import CustomerStatus from '../helpers/customerStatusClass';

class CustomerIntake {
  constructor(customer) {
    this.customer = customer;
  }

  getSurveyorID() {
    const id = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer })
       .then((customer) => {
         resolve(customer.surveyor.id);
       });
    });
    return id;
  }

  getSurveyType() {
    const type = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer })
         .then((customer) => {
           const inquriy = !customer.surveyor.id && !customer.sendSurvey;
           if (inquriy) {
             resolve(2);
           }
           if (customer.surveyor) {
             resolve(1);
           }
           if (customer.sendSurvey) {
             resolve(0);
           }
         });
    });
    return type;
  }


  submitCustomer() {
    this.getSurveyType()
    .then((res) => {
      if (res === 2) {
        const status = new CustomerStatus(this.customer);
        status.setSurveyType(2);
      }
      if (res === 1) {
        this.getSurveyorID()
            .then((id) => {
              const status = new CustomerStatus(this.customer, id);
              status.dispatchCustomertoSurveyor();
            });
      }
    });
  }

}


export default CustomerIntake;


/*
    const Customer = CustomersModel.findOne({ _id: args.id })
             .then((customer) => {
               const surveyor = !customer.surveyor.id;
               const survey = !customer.sendSurvey;
               const inquriy = survey && surveyor;
               // does customer want online estmate? send to prefered mode of contact
               if (customer.sendSurvey === true) {
                 if (customer.cellNotification) {
                   sendSMStoCustomer({ number: customer.cphone, customer });
                 }
                 if (customer.homeNotification) {
                   sendSMStoCustomer({ number: customer.hphone, customer });
                 }
                 if (customer.workNotification) {
                   sendSMStoCustomer({ number: customer.wphone, customer });
                 }
                 if (customer.email1Notification) {
                   sendEmailSurveytoCustomer({ email: customer.email1, customer });
                 }
                 if (customer.email2Notification) {
                   sendEmailSurveytoCustomer({ email: customer.email2, customer });
                 }
                 customer.surveyType = 0;
                 customer.status = 5;
                 customer.save();
               }
               if (!surveyor) {
                 sendSMStoSurveyor(customer);
                 UsersModel.findOne({ _id: customer.surveyor.id })
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
                 customer.surveyType = 1;
                 customer.status = 0;
                 customer.save();
               }
               if (inquriy) {
                 customer.status = 0;
                 customer.surveyType = 3;
                 customer.save();
               }
               return customer;
             });
      return Customer;




*/