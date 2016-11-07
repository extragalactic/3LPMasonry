import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const CustomerSchema = new mongoose.Schema({
  _id: ObjectId,
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

const CustomersModel = mongoose.model('customers', CustomerSchema);

module.exports = CustomersModel;
