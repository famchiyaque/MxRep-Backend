const mongoose = require("mongoose");

const professorRequestSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  professorEmail: {
    type: String,
    required: true,
  },
  professorName: {
    type: String,
    required: true,
  },
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

module.exports = ProfessorRequest;
