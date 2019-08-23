const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { authenticate, authorize } = require("../../../middleware/auth");
const { uploadImage } = require("../../../middleware/uploadImage");
// router.get("/", userController.getUsers)
// router.get("/:id", userController.getUserbyid)
// router.post("/", userController.createUser)
// router.put("/:id", userController.updateUser)
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserbyid);
router.post("/", userController.createUser);
router.put(
  "/:id",
  authenticate,
  authorize(["driver", "passenger"]),
  userController.updateUserById
);
// router.delete(
//   "/:id",
//   authenticate,
//   authorize(["admin"]),
//   userController.deleteUserById
// );
router.post("/login", userController.login);
// router.post(
//   "/upload-avatar/:id",
//   authenticate,
//   authorize(["driver", "passenger"]),
//   uploadImage("avatar"),
//   userController.uploadAvatar
// );

// module.exports = router;

module.exports = router;
