import twilio from 'twilio';

class TwillioClass {
  constructor(customer, contact) {
    this.customer = customer;
    this.contact = contact;
    this.client = twilio(process.env.SMS_SID_PROD, process.env.SMS_TOKEN_PROD);
  }

  sendSMS(to, message) {
    this.client.sendMessage({
      to: this.customer.surveyor.mobile,
      from: '+16474902780',
      body: message,
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('sms sent', res);
      }
    });
  }


  sendSMStoSurveyor() {
    this.client.sendMessage({
      to: this.customer.surveyor.mobile,
      from: '+16474902780',
      body: `Hey ${this.customer.surveyor.firstName}!  We have a new customer named ${this.customer.firstName} ${this.customer.lastName} located at ${this.customer.address}. Can you please contact them at ${this.customer.cphone} to arrange for a site survey.`,
    }, (err, res) => {
      if (err) {
       console.log(err);
      } else {
      console.log('sms sent');
      }
    });
  }

  sendSMStoCustomer(number) {
    this.client.sendMessage({
      to: number,
      from: '+16474902780',
      body: `Hello ${this.customer.firstName} click on the link to upload photos https://tlpm.ca/upload/${this.customer._id}`,
    }, (err, res) => {
      if (err) {
       console.log(err);
      } else {
      console.log('sms sent');
      }
    });
  }
}

export default TwillioClass;
