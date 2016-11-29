import twilio from 'twilio';
const SendSMS = (args) => {
    const creds = {
        sid: process.env.SMS_SID_PROD,
        token: process.env.SMS_TOKEN_PROD
    };

    const client = twilio(creds.sid, creds.token);
    client.sendMessage({
        to: args.surveyor.mobile,
        from: '+16474902780',
        body: `Hey ${args.surveyor.firstName}!  We have a new customer named ${args.firstName} ${args.lastName} located at ${args.address}. Can you please contact them at ${args.cphone} to arrange for a site survey.`
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
};

module.exports = SendSMS;
