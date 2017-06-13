import CustomersModel from '../lib/CustomerModel';
import CustomerStatus from '../helpers/customerStatusClass';
import TwillioClass from '../helpers/twillioClass';
import SendInBlue from '../helpers/sendInBlueClass';


class CustomerIntake {
  constructor(customer) {
    this.customer = customer;
    this.status = new CustomerStatus(this.customer);
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
           if (customer.sendSurvey) {
             resolve(0);
           }
           if (customer.surveyor) {
             resolve(1);
           }
         });
    });
    return type;
  }

  submitCustomer() {
    return this.getSurveyType()
    .then((res) => {
      if (res === 2) {
        const status = new CustomerStatus(this.customer);
        status.setSurveyType(2);
        status.setCustomerStatus(0);
      }
      if (res === 1) {
        this.getSurveyorID()
            .then((id) => {
              const status = new CustomerStatus(this.customer, id);
              status.dispatchCustomertoSurveyor();
            });
      }
      if (res === 0) {
        const status = new CustomerStatus(this.customer);
        status.setSurveyType(0);
        status.setCustomerStatus(0);
        status.addCustomertoQueue();
        status.getContactPreference()
          .then((pref) => {
            if (pref.email) {
              status.getCustomer()
                .then((customer) => {
                  const email = new SendInBlue(customer);
                  pref.emailContact.forEach((num) => {
                    email.sendEmailSurveytoCustomer(num);
                  });
                });
            }
            if (pref.sms) {
              status.getCustomer()
                .then((customer) => {
                  const sms = new TwillioClass(customer);
                  pref.smsContact.forEach((num) => {
                    sms.sendSMStoCustomer(num);
                  });
                });
            }
          });
      }
    }).then(() => {
      const status = new CustomerStatus(this.customer);
      return status.getCustomer().then(customer => (customer));
    });
  }
}

export default CustomerIntake;
