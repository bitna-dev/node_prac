const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  passowrd: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    //email로 로그인을 할 경우 구글아이디가 재생성됨을 방지하기 위함
    sparse: true,
  },
});

//Method
userSchema.methods.comparePassword = function (plainPassword, cb) {
  if (plainPassword === this.passowrd) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: "error" });
};
const User = mongoose.model("User", userSchema);
module.exports = User;
