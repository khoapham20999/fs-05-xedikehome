const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../model/user");

// email : khac rong + valid + unique
// password : > 8 ki tu + confirm password = password + ...
// dob : khac rong + valid ..

const validatePostInput = async data => {
  // data : email, password, dob, ...
  let errors = {};

  data.email = _.get(data, "email", " "); // neu data.email = " " => data.email = " "
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.dob = _.get(data, "dob", "");
  data.userType = _.get(data, "userType", "");
  // data.date = _.get(data, "date", "")
  // = =  data.email = data.email ? data.email : "
  if (validator.isEmpty(data.email)) {
    errors.email = "email is required !!";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid !!";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "email exist";
  }
  // password
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "password must be at least 8 characters";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password is required";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password must match";
  }

  // date
  if (validator.isEmpty(data.dob)) {
    errors.dob = "date is required";
  }
  // userType 

  if (
    !validator.equals(data.userType, "driver") &&
    !validator.equals(data.userType, "passenger") &&
    !validator.equals(data.userType, "admin")
  ) {
    errors.userType = "userType is required";
  }


  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

module.exports = { validatePostInput };
