import mongoose from 'mongoose';

const QueueSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email1: String,
  email2: String,
  hphone: String,
  cphone: String,
  wphone: String,
  address: String,
});

const QueueModel = mongoose.model('queue', QueueSchema);

module.exports = QueueModel;
