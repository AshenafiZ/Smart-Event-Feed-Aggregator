const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  source: { type: String, enum: ['Ticketmaster', 'Eventbrite'], required: true },
  url: { type: String, required: true },
  imageUrl: String,
  category: String,
  classifications: [{
    segment: String,
    genre: String,
    subGenre: String
  }],
  venueName: String,
  city: String,
  status: String,
  ticketLimit: String,
  pleaseNote: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
