const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  firstNames: { type: String, required: true },
  lastNames: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["super-admin", "admin", "professor", "student"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

const findByEmail = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (password == user.passwordHash) {
        return user;
    }

    return null;
};

module.exports = {
  User,
  findByEmail,
};