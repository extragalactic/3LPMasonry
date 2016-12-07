import twilio from 'twilio';
const sendSMStoSurveyor = (args) => {
  const creds = {
    sid: process.env.SMS_SID_PROD,
    token: process.env.SMS_TOKEN_PROD,
  };
  const client = twilio(creds.sid, creds.token);
  client.sendMessage({
    to: args.surveyor.mobile,
    from: '+16474902780',
    body: `Hey ${args.surveyor.firstName}!  We have a new customer named ${args.firstName} ${args.lastName} located at ${args.address}. Can you please contact them at ${args.cphone} to arrange for a site survey.`,
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('sms sent');
    }
  });
};

const sendSMStoCustomer = (args) => {
  const client = twilio(process.env.SMS_SID_PROD, process.env.SMS_TOKEN_PROD);
  console.log(args.data.firstName);
  client.sendMessage({
    to: args.number,
    from: '+16474902780',
    body: `Hello ${args.data.firstName} click on the link to upload photos http://tlpm.ca:8080/upload/${args.data.id}`,
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('sms sent');
    }
  });
};
module.exports = { sendSMStoSurveyor, sendSMStoCustomer };
