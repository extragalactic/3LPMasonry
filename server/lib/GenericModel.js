import mongoose from 'mongoose';

const GenericSchema = new mongoose.Schema({
  heading: String,
  bulletpoints: [String],
  paragraph: [String],
  warranty: String,
});

const GenericModel = mongoose.model('generics', GenericSchema);

module.exports = GenericModel;
