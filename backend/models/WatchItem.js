const mongoose = require('mongoose');

const watchItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Movie', 'TV Show'], required: true },
  watchedDate: { type: Date, required: true },
  genre: { type: String },
  rating: { type: Number, min: 0, max: 10 },
  review: { type: String },
  image: { type: String }, // stores filename
  downloadlink: { type: String }
});

module.exports = mongoose.model('WatchItem', watchItemSchema);
