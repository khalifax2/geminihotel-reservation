const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Please provide room number"],
    unique: true,
  },
  type: {
    type: String,
    required: [true, "Please provide room type"],
  },
  capacity: {
    type: Number,
    required: [true, "Please provide room number"],
  },
  adult: Number,
  child: Number,
  includes: String,
  photo: {
    type: String,
    // default: 'no-photo.jpg'
  },
  rate: {
    type: Number,
    required: [true, "Please provide room rate"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
