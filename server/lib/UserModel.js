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
    status: String,
  }],
});

const UsersModel = mongoose.odel('users', UsersSchema);

module.exports = UsersModel;