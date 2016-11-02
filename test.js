const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbOptions = {
  user: 'svc_mongo',
  pass: 'Fractal90',
};


mongoose.connect('mongodb://ds031597.mlab.com:31597/threelittlepigs', dbOptions);

const CustomerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email1: String,
  email2: String,
  hphone: String,
  cphone: String,
  wphone: String,
  address: String,
  notes: String,
  surveyor: String,
  estimator: String,
  status: String,
});


const Customers = mongoose.model('customers', CustomerSchema);

const cust = new Customers({
  firstName: 'Jane',
  lastName: 'Doe',
  email1: 'jdoe1@doe.com',
  email2: 'jdoe2@doe.com',
  hphone: '555555555',
  cphone: '66666666',
  wphone: '77777777',
  address: '123 Elm St',
  notes: 'customer notes',
  surveyor: 'John Fritz',
  estimator: 'David Fritz',
  status: 'new',
});

console.log(cust);


cust.save();
