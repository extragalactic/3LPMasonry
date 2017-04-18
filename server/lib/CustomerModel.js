import mongoose from 'mongoose';

mongoose.Promise = global.Promise;


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
    _id: String,
    text: String,
    createdAt: String,
    user: {
      _id: String,
      name: String,
    },
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
      description: [String],
      timestamp: String,
      user: String,
      orginalBase64: String,
      editedlBase64: String,
      orginalURL: String,
      thumbURL: String,
      thumb: String,
      photo: String,
      caption: String,
      filename: String,
      selected: Boolean,
      docID: String,
      localfile: String,
    }],
    localPhotos: [{
      heading: String,
      description: [String],
      timestamp: String,
      user: String,
      orginalBase64: String,
      editedlBase64: String,
      orginalURL: String,
      thumbURL: String,
      thumb: String,
      photo: String,
      caption: String,
      filename: String,
      selected: Boolean,
      docID: String,
      localfile: String,
    }],
  },
  estimate: {
    prices: [[
      {
        description: String,
        price: 0,
      },
    ]],
    photos: [String],
    pdf: String,
  },
  pricing: [[
    {
      description: String,
      price: 0,
    },
  ]],
  prices: [
    {
      description: String,
      amount: Number,
      numOptions: Number,
      option1: {
        enabled: Boolean,
        description: String,
        amount: Number,
      },
      option2: {
        enabled: Boolean,
        description: String,
        amount: Number,
      },
      option3: {
        enabled: Boolean,
        description: String,
        amount: Number,
      },
      option4: {
        enabled: Boolean,
        description: String,
        amount: Number,
      },
      option5: {
        enabled: Boolean,
        description: String,
        amount: Number,
      },
    },
  ],
  estimatePDF: String,
  surveyReadyforPrice: { type: Boolean, default: false },
  estimateQueueId: String,
});

const CustomersModel = mongoose.model('customers', CustomerSchema);

module.exports = CustomersModel;

