const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  email: { type: String },
  domain: { type: String },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Institution = mongoose.model("Institution", InstitutionSchema);

const findById = async (id) => {
  return await Institution.findOne({ _id: id });
};

module.exports = {
  Institution,
  findById,
};