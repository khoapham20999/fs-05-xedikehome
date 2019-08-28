const express = require("express");
const router = express.Router();
const tripController = require("./tripcontroller");
const { authenticate, authorize } = require("../../../middleware/auth");
// const { uploadImage } = require("../../../middlewares/uploadImage");

// GET    {host}/api/trips (PUBLIC)
// GET    {host}/api/trips/:id (PUBLIC)
// POST   {host}/api/trips (PUBLIC)
// PUT    {host}/api/trips/:id (PRIVATE)
// DELETE {host}/api/trips/:id (PRIVATE)

router.post(
  "/",
  authenticate,
  authorize(["driver"]),
  tripController.createTrip
);

router.get("/", tripController.getTrips);
router.delete("/:id", tripController.deleteTrip);

router.get("/:tripid", tripController.getTripById);

router.put(
  "/:id",
  authenticate,
  authorize(["driver"]),
  tripController.updateTripById
);

router.post(
  "/book-trip/:tripId",
  authenticate,
  // authorize(["passenger"]),
  tripController.bookTrip
);

router.post(
  "/finish-trip/:tripId",
  authenticate,
  // authorize(["passenger"]),
  tripController.finishTrip
);

module.exports = router;
// export default router
