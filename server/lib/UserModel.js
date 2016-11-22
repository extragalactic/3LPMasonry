import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const UsersSchema = new mongoose.Schema({
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  estimator: Boolean,
  surveyor: Boolean,
  office: Boolean,
  mobile: String,
  region: String,
  appointments: []
})

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel
