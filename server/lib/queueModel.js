import mongoose from 'mongoose';

const QueueSchema = new mongoose.Schema({
  customer: String,
  timestamp: String,
  accepted: Boolean,
});

const QueueModel = mongoose.model('queue', QueueSchema);

module.exports = QueueModel;
