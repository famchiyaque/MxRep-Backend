import mongoose from 'mongoose'

const InstitutionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  country: { type: String },
  city: { type: String },
  phoneNumber: { type: Number },
  email: { type: String, unique: true },
  domain: { type: String, unique: true },
  slug: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["active", "disactive"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

const Institution = mongoose.model("Institution", InstitutionSchema);

const institutionModel = {
  Institution
};

export default institutionModel