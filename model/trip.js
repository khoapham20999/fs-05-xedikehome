const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  locationFrom: { type: String },
  locationTo: { type: String },
  startTime: Date,
  availableSeats: Number, // 7 cho : 6 ghe trong
  fee: Number,
  passengers: [
    {
      passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      numberOfBookingSeat: Number
    }
  ],
  isFinish: { type: Boolean, default: false }
});

const trip = mongoose.model("Trip", tripSchema, "Trip");

module.exports = { tripSchema, trip };
