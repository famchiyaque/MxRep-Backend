import mongoose from 'mongoose'

const professorRequestSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  email: { type: String, required: true },
  firstNames: { type: String, required: true },
  lastNames: { type: String, required: true },
  department: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfessorRequest = mongoose.model(
  "ProfessorRequest",
  professorRequestSchema
);

const professorRequestModel = {
  ProfessorRequest
}

export default professorRequestModel