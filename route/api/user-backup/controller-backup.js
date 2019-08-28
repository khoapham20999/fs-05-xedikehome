// const { User } = require("../../../model/user");
// const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken")

// module.exports.getUsers = (req, res, next) => {
//   User.find()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => res.json.err);
// };
// // route : POST {host}/api/user

// module.exports.getUserById = (req, res, next) => {
//   const id = req.params.id; // const {id} = req.params
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(400).json({ message: "not valid" });
//   User.findById(id)
//     .then(user => {
//       if (!user) return res.status(404).json({ message: "user not found" });
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       res.status(err.status).json(err.message);
//     });
// };
// // module.exports.createUsers = (req, res, next) => {
// //   const { email, password, dob, userType, phone } = req.body;
// //   const newUser = new User({
// //     email,
// //     password,
// //     dob,
// //     userType,
// //     phone
// //   });

// //   bcrypt.genSalt(10, (err, salt) => {
// //     if (err) return res.json(err);
// //     bcrypt.hash(password, salt, (err, hash) => {
// //       if (err) return res.json(err);
// //       console.log(hash);
// //       newUser.password = hash;
// //       newUser
// //         .save()
// //         .then(users => {
// //           console.log(users);
// //           res.status(200).json(users);
// //         })
// //         .catch(err => res.json(err));
// //     });
// //   });
// // };

// module.exports.createUser = (req, res, next) => {
//   const { email, password, dob, userType, phone } = req.body;
//   const newUser = new User({
//     email: email,
//     password: password,
//     dob: dob,
//     userType: userType,
//     phone: phone
//   });
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return res.json(err);
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) return req.status(404).json(err);
//       newUser.password = hash;
//       newUser
//         .save()
//         .then(user => {
//           return res.status(200).json(user);
//         })
//         .catch(err => {
//           res.json(err);
//         });
//     });
//   });
// };

// module.exports.getUserById = (req, res, next) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(400).json({ message: "not valid" });

//   User.findById(id)
//     .then(user => {
//       if (!user)
//         return Promise.reject({ status: 404, message: "user not found" });
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       res.status(err.status).json({ message: err.message });
//     });
// };

// // module.exports.updateUserById = (req, res, next) => {
// //   const { id } = req.params;
// //   User.findById(id)
// //     .then(user => {
// //       if (!user)
// //         return Promise.reject({ status: 404, message: "user not found" });
// //       const { email, password, dob, userType, phone } = req.body;
// //       user.email = email;
// //       user.password = password;
// //       user.dob = dob;
// //       user.userType = userType;
// //       user.phone = phone;
// //       return user.save();
// //     })
// //     .then(user => {
// //       res.status(200).json(user);
// //     })
// //     .catch(err => {
// //       if (err.status) return res.status(err.status).json(err.message);
// //       return res.json(err);
// //     });
// // };

// module.exports.updateUserById = (req, res, next) => {
//   const id = req.params.id; // const {id} = req.params
//   User.findById(id)
//     .then(user => {
//       if (!user)
//         return Promise.reject({ status: 404, message: "user not found" });

//       const { email, password, dob, userType, phone } = req.body;
//       user.email = email;
//       user.password = password;
//       user.dob = dob;
//       user.userType = userType;
//       user.phone = phone;
//       bcrypt.genSalt(10, (err, salt) => {
//         if (err) return res.json(err);
//         bcrypt.hash(user.password, salt, (err, hash) => {
//           if (err) return res.json(err);
//           console.log(hash);
//           user.password = hash;
//           user.save().then(user => {
//             res.json(user).status(200);
//           });
//         });
//       });
//     })
//     .catch(err => {
//       res.json(err);
//     });
// };

// module.exports.deleteUserById = (req, res, next) => {
//   const { id } = req.params;
//   User.deleteOne({ _id: id })
//     .then(result => res.status(200).json(result))
//     .catch(err => res.json(err));
// };

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email })
//     .then(user => {
//       if (!user) return Promise.reject({ status: 404, message: "not found" });
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (!isMatch) res.status(400).json({ message: "wrong password" });

//         const payload = {
//           email: user.email,
//           userType: user.userType
//         };
//         jwt.sign(payload, "xedike", { expiresIn: 3600 }, (err, token) => {
//           if (err) res.json(err);
//           res.status(200).json({
//             success: true,
//             token: token
//           });
//         });
//       });
//     })
//     .catch(err => {
//       if (!err.status) return res.json(err);
//       res.status(err.status).json({ message: err.message });
//     });
// };

// // module.exports = router;

// ===========================================================================
const { User } = require("../../../model/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const jwt = require("")
// module.exports.getUsers = (req, res, next) => {
//   User.find()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => res.json.err);
// };
// getUser demo
module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

// route : POST {host}/api/user
// module.exports.createUsers = (req, res, next) => {
//   const { email, password, dob, userType, phone } = req.body;
//   const newUser = new User({
//     email,
//     password,
//     dob,
//     userType,
//     phone
//   });

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return res.json(err);
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) return res.json(err);
//       console.log(hash);
//       newUser.password = hash;
//       newUser
//         .save()
//         .then(users => {
//           console.log(users);
//           res.status(200).json(users);
//         })
//         .catch(err => res.json(err));
//     });
//   });
// };

module.exports.createUsers = (req, res, next) => {
  const { email, password, dob, userType, phone } = req.body;
  const newUser = new User({
    email: email,
    password: password,
    userType : userType,
    dob: dob,
    password: password,
    phone: phone
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.json(err);
      newUser.password = hash;
      console.log(hash);
      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          res.json(err);
        });
    });
  });
};

// module.exports.getUserById = (req, res, next) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(400).json({ message: "not valid" });

//   User.findById(id)
//     .then(user => {
//       if (!user)
//         return Promise.reject({ status: 404, message: "user not found" });
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       res.status(err.status).json({ message: err.message });
//     });
// };

module.exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "not valid" });
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "user not found " });
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(err.status).json({ message: err.message });
    });
};

module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "user not found" });

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
                .then(users => {
                  console.log(users);
                  res.status(200).json(users);
                })
                .catch(err => res.json(err));
            });
          });
        });
    })

    .catch(err => {
      if (err.status) return res.status(err.status).json(err.message);
      return res.json(err);
    });
};
// getUser getUserbyId updateUser

// module.exports.updateUserById = (req, res, next) => {
//   const id = req.params.id;
//   User.findById(id).then(user => {
//     if (!user)
//       return Promise.reject({ status: 400, message: "user not found" });
//     const { email, password, dob, userType, phone } = req.body;
//     user.email = email,
//     user.password = password,
//     user.userType = userType,
//     user.dob = dob,
//     user.phone = phone

//     bcrypt.genSalt(10, (err, salt) => {
//       if(err) return res.json(err)
//       bcrypt(user.password, salt, (err, hash) => {
//         if(err) return res.json(err)
//         user.password = hash
//         console.log(hash)
//         user.save()
//         .then(user => {
//           res.status(200).json(user)
//         })
//         .catch(err => {
//           res.json(err)
//         })
//       })
//     })
//   })
//   .catch(err => {
//     res.status(err.status).json({message : err.message})
//   })
// };

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "not found" });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) res.status(400).json({ message: "wrong password" });
        const payload = {
          email: user.email,
          userType: user.userType
        };
        jwt.sign(payload, "xedike", { expiresIn: 3600 }, (err, token) => {
          if (err) res.json(err);
          res.status(200).json({
            success: true,
            token: token
          });
        });
      });
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json({ message: err.message });
    });
};

module.exports.uploadAvatar = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "not found" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(200).json({ message: err.message });
    });
};

// module.exports = router;
