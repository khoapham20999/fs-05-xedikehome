const _ = require("lodash");

// lodash isEmpty -- check object or array empty or not ==> true/false

console.log(_.isEmpty([1, 2, 3]));
console.log(_.isEmpty([]));

// _.get()
// nested Object
console.log(
  "================================================================="
);
const user1 = {
  cre: {
    email: "abc@gmail.com",
    password: "abc"
  },
  profile: {
    name: "nguyen van a",
    age: 22,
    address: {
      number: 10,
      street: "nguyen anh thu",
      province: "tphcm"
    }
  }
};
let user2 = {
  cre: {
    email: "khoa@gmail.com",
    password: "khoa"
  }
  // profile : {
  //     name : "nguyen van a",
  //     age : 22,
  //     address : {
  //         number : 10,
  //         street : "nguyen anh thu",
  //         province : "tphcm"
  //     }
  // }
};

console.log(user1.profile.address.province);

console.log(_.get(user1, "profile.address.province"));
console.log(
  _.get(user2, "profile.address.province", "nguoi dung chua nhap dia chi")
);
console.log(
  "================================================================="
);

// _.set()

user1.profile.address.province = "ninh binh";
// user1.profile.address.province = "ninh binh"
// _.set(user2, "profile.address.province", "da nang")

user2 = {
  ...user2,
  profile: {
    address: {
      province: "da lat"
    }
  }
};
console.log(JSON.stringify(user2, undefined, 2));
