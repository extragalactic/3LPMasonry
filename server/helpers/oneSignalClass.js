import UsersModel from '../lib/UserModel';
import axios from 'axios';

class OneSignalClass {
  constructor(user, customer) {
    this.user = user;
    this.customer = customer;
  }
  savePlayerIdtoUser(id) {
    return UsersModel.findOne({ _id: this.user })
     .then((user) => {
       user.oneSignalID = id;
       user.save();
       return true;
     });
  }
  sendPushtoEstimators() {
    axios({
      method: 'post',
      url: 'https://onesignal.com/api/v1/notifications',
      data: {
        app_id: 'ca2c967a-2b86-4315-8a1d-ed5e58b92f95',
        included_segments: ['Estimators'],
        data: { customer: this.customer._id },
        contents: { en: 'New Estimate Ready' },
        headings: { en: this.customer.address },
        buttons: [{ id: 'id1', text: 'Accept' }],
      },
      headers: { Authorization: `Basic ${process.env.ONE_SIGNAL_AUTH}` },
    }).then(data => console.log('data')).catch(err => console.error(err));
  }
}

export default OneSignalClass;

