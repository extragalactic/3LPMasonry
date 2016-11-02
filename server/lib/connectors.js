import mongoose from 'mongoose';
import cred from '../../creds';

mongoose.connect('mongodb://ds031597.mlab.com:31597/threelittlepigs', cred);

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

export default { Customers };
