const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your firstname"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide your lastname"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
    select: false // Never show the output
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your confirm password"],
    validate: {
      // This only works on CREATE and SAVE  Note: mongoose dont save current document in memory
      validator: function(el) {
        return el === this.password;
      },
      message: "Password are not equal!"
    }
  },
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt the password  - hooks middleware
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Save change password timestamp - hooks middleware
userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // Prevent jwt save first before passwordChageAt save
  next();
});

// Password compare function
userSchema.methods.checkPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Password check if it's changed
userSchema.methods.changedPasswordAt = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt / 1000, 10);

    return JWTTimestamp < changedTimestamp; // 100 < 200
  }

  return false;
};

// Sign jwt and return
userSchema.methods.getSignedToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Generate hash password token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  // console.log({ resetToken }, this.resetPasswordToken);

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
