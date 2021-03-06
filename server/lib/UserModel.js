import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  name: String,
  email: String,
  estimator: Boolean,
  surveyor: Boolean,
  office: Boolean,
  mobile: String,
  region: String,
  oneSignalID: String,
  appointments: [],
  customers: [],
  newCustomers: [{
    id: String,
    firstName: String,
    lastName: String,
    email1: String,
    email2: String,
    hphone: String,
    cphone: String,
    wphone: String,
    address: String,
    status: Number,
  }],
  followUp: [{
    name: String,
    address: String,
    start: String,
    end: String,
    description: String,
    userid: String,
    custid: String,
    calid: String,
  }],
  estimates: [{
    id: String,
    firstName: String,
    lastName: String,
    email1: String,
    email2: String,
    hphone: String,
    cphone: String,
    wphone: String,
    address: String,
    status: Number,
  }],
});

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;
