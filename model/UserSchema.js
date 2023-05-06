const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// static signup methods (signup and loggin) on the user model
UserSchema.statics.signup = async function (names, email, password) {
  const exist = await this.findOne({ email });
  try {
    if (!email || !password || !names) {
      throw Error("Fill in all credentials");
    }
    if (exist) {
      throw Error("Email Already Exist");
    }
    // for userpassword harshing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ names, email, password: hash });
    return user;
  } catch (error) {
    throw error
  }
};

UserSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!email || !password) {
      throw Error("Fill in all credentials");
    }
    if (!user) {
      throw Error("Incorrect email");
    }
    if (!matchPassword) {
      throw Error("Incorrect Password");
    }
    return user;
  } catch (error) {
    console.log(error)
    throw error
  }
};

module.exports = mongoose.model("user", UserSchema);
