import mongoose from 'mongoose'

const institutionRequestSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  slug: { type: String, required: true },
  domain: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  contactEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },

  email: { type: String, required: true },
  firstNames: { type: String, required: true },
  lastNames: { type: String, required: true },
  role: { type: String, enum: ["admin", "professor"], required: true },
  department: { type: String },

  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InstitutionRequest = mongoose.model(
  "InstitutionRequest",
  institutionRequestSchema
);

const institutionRequestModel = {
  InstitutionRequest
}

export default institutionRequestModel