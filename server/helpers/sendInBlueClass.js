class SendInBlue {
  constructor(customer, mailid) {
    this.mailid = mailid;
    require('../../node_modules/mailin-api-node-js/V2.0/mailin')
    this.client = new Mailin('https://api.sendinblue.com/v2.0', process.env.MAILIN, 5000);
    this.customer = customer;
  }
  getEmailStatus() {
    const status = new Promise((resolve, reject) => {
      const obj = {};
      this.client.get_report({ message_id: this.mailid }).on('complete', (data) => {
        const report = JSON.parse(data).data;
        report.forEach((item) => {
          if (obj.hasOwnProperty(item.event)) {
            obj[item.event]++;
          } else {
            obj[item.event] = 1;
          }
        });
        resolve({ clicks: obj.clicks, views: obj.views, delivery: obj.delivery });
      });
    });
    return status;
  }

  sendEmailSurveytoCustomer(email) {
    const emailData = { id: 2,
      to: email,
      bcc: 'outgoingtlpmail@gmail.com',
      attr: { CUSTOMER: this.customer.firstName, LINK: `tlpm.ca/upload/${this.customer.id}` },
    };
    this.client.send_transactional_template(emailData).on('complete', (data) => {
      console.log(data);
    });
  }

  sendEmailEstimatetoCustomer(customer, url) {
    const emailData = { id: 3,
      to: this.customer.email1 ? this.customer.email1 : this.customer.email2,
      bcc: 'outgoingtlpmail@gmail.com',
      attr: { CUSTOMER: customer.firstName, LINK: `3lpm.s3.ca-central-1.amazonaws.com/${url}` },
    };
    this.client.send_transactional_template(emailData).on('complete', (data) => {
      console.log(data);
    });
  }
}

export default SendInBlue;
