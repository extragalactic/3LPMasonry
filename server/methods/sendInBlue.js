const sendEmailSurveytoCustomer = (args) => {
  require('../../node_modules/mailin-api-node-js/V2.0/mailin');
  const client = new Mailin('https://api.sendinblue.com/v2.0', process.env.MAILIN, 5000);
  const emailData = { id: 2,
    to: args.email,
    bcc: 'outgoingtlpmail@gmail.com',
    attr: { CUSTOMER: args.data.firstName, LINK: `tlpm.ca/upload/${args.data.id}` },
  };
  client.send_transactional_template(emailData).on('complete', (data) => {
    console.log(data);
  });
};

const sendEmailEstimatetoCustomer = (customer) => {
  require('../../node_modules/mailin-api-node-js/V2.0/mailin');
  const client = new Mailin('https://api.sendinblue.com/v2.0', process.env.MAILIN, 5000);
  const emailData = { id: 3,
    to: customer.email1 ? customer.email1 : customer.email2,
    bcc: 'outgoingtlpmail@gmail.com',
    attr: { CUSTOMER: customer.firstName, LINK: `3lpm.s3.ca-central-1.amazonaws.com/${customer._id}/${customer.firstName}${customer.lastName}Estimate.pdf` },
  };
  client.send_transactional_template(emailData).on('complete', (data) => {
    console.log(data);
  });
};


module.exports = { sendEmailSurveytoCustomer, sendEmailEstimatetoCustomer };
