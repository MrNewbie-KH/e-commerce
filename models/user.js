const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide user name"],
      maxlength: [40, "Username can't exceed 40 chars"],
    },
    password: {
      type: String,
      required: [true, "Please,provide a user password"],
      minlength: [6, "Too short password"],
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImage: String,
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    resetCode: String,
    resetExpireDate: Date,
    resetCodeVerify: Boolean,
  },
  { timestamps: true }
);
// hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // create salt
  const salt = await bcrypt.genSalt(10);
  // create hash with password and salt
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
// compare password function
userSchema.methods.comparePassword = async function (currentPassword) {
  const isMatchingPassword = await bcrypt.compare(
    currentPassword,
    this.password
  );
  return isMatchingPassword;
};
module.exports = mongoose.model("userSchema", userSchema);
