import mongoose from 'mongoose';

const PhotosSchema = new mongoose.Schema({
  base64: String,
  url: String,
  docID: String,
});

const PhotosModel = mongoose.model('photos', PhotosSchema);

module.exports = PhotosModel;
