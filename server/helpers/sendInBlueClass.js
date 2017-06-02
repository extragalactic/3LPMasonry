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
        console.log(report)
        report.forEach((item) => {
          if (obj.hasOwnProperty(item.event)) {
            obj[item.event]++;
          } else {
            obj[item.event] = 1;
          }
        });
        console.log(obj)
        resolve({ clicks: obj.clicks, views: obj.views, delivery: obj.delivery });
      });
    });
    return status;
  }
}

export default SendInBlue;
