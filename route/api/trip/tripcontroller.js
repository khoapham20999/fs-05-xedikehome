const { trip } = require("../../../model/trip");
const { User } = require("../../../model/user");
const mongooose = require("mongoose");

// module.exports.createTrip();
// creator : driver

module.exports.createTrip = (req, res, next) => {
  const driverId = req.user.id;
  const { locationFrom, locationTo, startTime, availableSeat, fee } = req.body;
  const newTrip = new trip({
    driverId,
    locationFrom,
    locationTo,
    startTime,
    availableSeat,
    fee
  });
  newTrip
    .save()
    .then(trip => {
      console.log(trip);
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
module.exports.getTrips = (req, res, next) => {
  trip
    .find()
    .then(trips => {
      res.status(200).json(trips);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.deleteTrip = (req, res, next) => {
  const id = req.params.id;
  trip
    .deleteOne({ _id: id })
    .then(result => {
      res.json(200).json(result);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.getTripById = (req, res, next) => {
  const { tripid } = req.params;
  trip
    .findById(tripid)
    .populate("driverId", "-password") // 2 tham so. _________ 1 : truong se lay -------- 2 : thong tin cua truong do
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.updateTripById = (req, res, next) => {
  const { id } = req.params;
  if (!mongooose.Types.ObjectId.isValid(id))
    return res.json({ status: 404, message: "not valid" });
  trip
    .findById(id)
    .then(trip => {
      if (!trip)
        return Promise.reject({ status: 400, message: "trip not found" });
      const {
        locationFrom,
        locationTo,
        startTime,
        availableSeat,
        fee
      } = req.body;
      //   Object.keys(req.body) // [email, password, dob, userType, phone]
      //     .forEach(field => {
      //       trip[field] = req.body[field];
      //       trip
      //         .save()
      //         .then(trip => {
      //           res.status(200).json(trip);
      //         })
      //         .catch(err => {
      //           res.json(err);
      //         });
      //     });
      trip.locationFrom = locationFrom;
      trip.locationTo = locationTo;
      trip.startTime = startTime;
      trip.availableSeat = availableSeat;
      trip.fee = fee;
      return trip.save();
    })
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(err.status).json(err.message);
    });
};

module.exports.bookTrip = (req, res, next) => {
  const passengerId = req.user.id;
  console.log(passengerId);
  const numberOfBookSeat = req.body;
  const { tripId } = req.params;
  trip
    .findById(tripId)
    .then(trip => {
      if (trip.availableSeat < numberOfBookSeat)
        return Promise.reject({ status: 400, message: "not enough seat" });
      const passenger = {
        passengerId,
        numberOfBookSeat
      };
      trip.passengers.push(passenger);
      trip.availableSeat = trip.availableSeat - numberOfBookSeat;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    // console.log(trip)
    .catch(err => {
      if (!err.status) return res.json(err);
    });
};

module.exports.finishTrip = (req, res, next) => {
  const { tripId } = req.params;
  trip
    .findById(tripId)
    .then(trip => {
      trip.isFinish = true;
      return trip.save();
    })
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
