// const express = require("express");
// const router = express.Router();
// const userController = require("./controller");
// const jwt = require("jsonwebtoken")

// const authenticate = (req, res, next) => {
//   const { token } = req.headers.token;
//   jwt.verify(token, "xedike", (err, decoded) => {
//     if (err) return res.status(401).json({ message: "token invalid" });
//     if (decoded) return next();
//   });
//   //   console.log(req.headers);
// //   next();
// // authorization : userType 
// };

// // const authorize = (type) => {
// //     return(req, res, next) => {

// //     }
// // }


// //  GET {host}/api/users (da viet) --- public
// //  GET {host}/api/users/:id
// // POST {host}/api/users (da viet) --- public
// // UPDATE {host}/api/users/:id
// // DELETE {host}/api/users/:id

// router.get("/", userController.getUsers);
// router.post("/", userController.createUsers);
// router.get("/:id", userController.getUserById);
// router.put("/:id", authenticate, userController.updateUserById);
// router.delete("/:id", userController.deleteUserById);
// router.post("/login", userController.login);
// module.exports = router;
// =============================================================================== 

const express = require("express");
const router = express.Router();
const userController = require("./controller");
// const { authenticate, authorize } = require("../../../middleware/auth");
// const path = require("path")

const multer = require("multer");

var storage = multer.diskStorage({
  // co hai thuoc tinh: destination, filename
   
  destination: function(req, file, cb) {
    // const uploadPath = path.join(__dirname + '/../../..upload/avatar')
    cb(null, "./upload/avatar");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({storage : storage})

router.get("/", userController.getUsers);
router.post("/", userController.createUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById)
router.delete("/:id", userController.deleteUserById);
router.post("/login", userController.login);
router.post(
  "/upload-avatar/:id",
  upload.single("avatar"),
  userController.uploadAvatar
);
module.exports = router;
