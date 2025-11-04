import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
  firstNames: { type: String, required: true },
  lastNames: { type: String, required: true },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, enum: ["super-admin", "admin", "professor", "student"], required: true },
  isAdmin: { type: Boolean, default: false },
  needsToConfigurePass: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

const findByEmail = async (email, password) => {
  const user = User.findOne({ email });

  if (password == user.passwordHash) {
    return user;
  }

  return null;
};

const userModel = {
  User,
  findByEmail,
};

export default userModel