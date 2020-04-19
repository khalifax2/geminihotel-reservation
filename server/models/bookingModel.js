const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  dateStart: {
    type: Date,
    required: [true, "Please provide starting date"]
  },
  dateEnd: {
    type: Date,
    required: [true, "Please provide ending date"]
  },
  status: {
    type: String,
    default: "Pending"
  },
  amount: {
    type: Number
  },
  events: {
    checkIn: String, // DATE ---
    checkOut: String
  },
  recurring: {
    checkOut: [String] // DATE ---
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  room: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Room"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
