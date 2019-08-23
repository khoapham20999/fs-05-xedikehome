const { User } = require("../../../model/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  validatePostInput
} = require("../../../validation/user/validatePostInput");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const { email, password, dob, userType, phone } = req.body;
  // validation
  const { isValid, errors } = await validatePostInput(req.body);
  console.log(isValid)
  console.log(errors)
  if (!isValid) return res.status(400).json(errors);
  const newUser = new User({
    email: email,
    password: password,
    dob: dob,
    userType: userType,
    phone: phone
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.json(err);
        });
    });
  });
};

module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "invalid id" });
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "user not found" });
      // const { email, password, dob, userType, phone } = req.body;
      // const { email, password, dob, userType, phone } = req.body;
      // user.email = email;
      // user.password = password;
      // user.dob = dob;
      // user.userType = userType;
      // user.phone = phone;
      Object.keys(req.body) // [email, password, dob, userType, phone]
        .forEach(field => {
          user[field] = req.body[field];
          bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.json(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) return res.json(err);
              console.log(hash);
              user.password = hash;
              user
                .save()
                .then(user => {
                  res.status(200).json(user);
                })
                .catch(err => {
                  res.json(err);
                });
            });
          });
        });
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.message);
      return res.json(err);
    });
};

module.exports.getUserbyid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "not valid" });
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "user not found" });
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(err.status).json(err.message);
    });
};
// updateUserById
/// copy - need to do it again

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Wrong password" });

        const payload = {
          id: user._id,
          email: user.email,
          userType: user.userType
        };

        jwt.sign(payload, "XEDIKE", { expiresIn: 3600 }, (err, token) => {
          if (err) res.json(err);
          res.status(200).json({
            success: true,
            token
          });
        });
      });
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json({ message: err.message });
    });
};

// module.exports.uploadAvatar = (req, res, next) => {
//   const { id } = req.params; // headers, params, body, file
//   console.log(req.params);
//   User.findById(id)
//     .then(user => {
//       if (!user) return Promise.reject({ status: 404, message: "Not found" });

//       user.avatar = req.file.path;
//       return user.save();
//     })
//     .then(user => {
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       if (!err.status) return res.json(err);
//       res.status(200).json({ messgage: err.message });
//     });
// };
