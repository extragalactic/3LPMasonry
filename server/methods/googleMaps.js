import axios from 'axios';
import CustomerModel from '../lib/CustomerModel';
// needs refactor, move second api call, use intial results insead of db query
const setMapsLocation = (args) => {
  const address = args.address;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`;
  axios.get(url).then((data) => {
    CustomerModel.findOne({ _id: args._id })
        .then((customer) => {
          customer.location = data.data.results[0];
          customer.coordinates.longitude = parseFloat(data.data.results[0].geometry.location.lng);
          customer.coordinates.latitude = parseFloat(data.data.results[0].geometry.location.lat);
          customer.save();
        });
  }).then(() => {
    setTimeout(() => {
      CustomerModel.findOne({ _id: args._id })
        .then((customer) => {
          console.log('customer', customer);
          const lng = customer.location.geometry.location.lng;
          const lat = customer.location.geometry.location.lat;
          const location = `${lat},${lng}`;
          const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location}&heading=151.78&pitch=-0.76&key=${process.env.GOOGLE_API_KEY}`;
          axios.get(streetViewUrl).then((data) => {
            customer.streetViewUrl = data.config.url;
            // customer.streetViewData = data.data;
            customer.save();
          });
        });
    }, 1000);
  });
};

module.exports = { setMapsLocation };
