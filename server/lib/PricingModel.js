import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema({
  description: String,
  price: Number,
});

const PricingModel = mongoose.model('prices', PricingSchema);

module.exports = PricingModel;
