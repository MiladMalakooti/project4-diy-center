const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    user_name: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    avatar: String,
    posts: [{
      type: Schema.Types.ObjectId,
      ref: "Post"
    }],
    bio: String,
    notifications: [String],
  },{
      timestamps: true
  }
);

userSchema.set("toJSON", {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);