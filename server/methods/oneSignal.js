import axios from 'axios';

const sendPushtoEstimators = (customer) => {
  axios({
    method: 'post',
    url: 'https://onesignal.com/api/v1/notifications',
    data: {
      app_id: 'ca2c967a-2b86-4315-8a1d-ed5e58b92f95',
      included_segments: ['Estimators'],
      data: { customer: customer._id },
      contents: { en: 'New Estimate Ready' },
      headings: { en: customer.address },
      buttons: [{ id: 'id1', text: 'Accept' }],
    },
    headers: { Authorization: `Basic ${process.env.ONE_SIGNAL_AUTH}` },
  }).then(data => console.log('data')).catch(err => console.error(err));
};

export { sendPushtoEstimators };
