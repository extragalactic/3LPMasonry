import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email1: String,
  email2: String,
  hphone: String,
  cphone: String,
  wphone: String,
  address: String,
  coordinance: String,
  notes: [{
    text: String,
    timestamp: String,
    user: String,
  }],
  surveyor: {
    firstName: String,
    lastName: String,
    mobile: String,
    id: String,
  },
  estimator: String,
  status: Number,
  email1Notification: Boolean,
  email2Notification: Boolean,
  cellNotification: Boolean,
  homeNotification: Boolean,
  workNotification: Boolean,
  sendSurvey: Boolean,
  customerUpload: [],
  location: {},
  streetViewData: String,
  streetViewUrl: String,
  coordinates: {
    latitude: String,
    longitude: String,
  },
  survey: {
    notes: [{
      heading: String,
      description: String,
      text: String,
      timestamp: String,
      user: String,
    }],
    photos: [{
      heading: String,
      description: String,
      timestamp: String,
      user: String,
      orginalBase64: String,
      editedlBase64: String,
      orginalURL: String,
      thumbURL: String,
      thumb: String,
      photo: String,
      caption: String,
      selected: Boolean,
    }],
  },
});

const CustomersModel = mongoose.model('customers', CustomerSchema);

module.exports = CustomersModel;
