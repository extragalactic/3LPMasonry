const sendEmailSurveytoCustomer = (args) => {
  require('../../node_modules/mailin-api-node-js/V2.0/mailin');
  const client = new Mailin('https://api.sendinblue.com/v2.0', process.env.MAILIN, 5000);
  const emailData = { id: 2,
    to: args.email,
    bcc: 'outgoingtlpmail@gmail.com',
    attr: { CUSTOMER: args.customer.firstName, LINK: `tlpm.ca/upload/${args.customer.id}` },
  };
  client.send_transactional_template(emailData).on('complete', (data) => {
    console.log(data);
  });
};

const sendEmailEstimatetoCustomer = (customer, url) => {
  require('../../node_modules/mailin-api-node-js/V2.0/mailin');
  const client = new Mailin('https://api.sendinblue.com/v2.0', process.env.MAILIN, 5000);
  const emailData = { id: 3,
    to: customer.email1 ? customer.email1 : customer.email2,
    bcc: 'outgoingtlpmail@gmail.com',
    attr: { CUSTOMER: customer.firstName, LINK: `3lpm.s3.ca-central-1.amazonaws.com/${url}` },
  };
  client.send_transactional_template(emailData).on('complete', (data) => {
    console.log(data);
  });
};


module.exports = { sendEmailSurveytoCustomer, sendEmailEstimatetoCustomer };
