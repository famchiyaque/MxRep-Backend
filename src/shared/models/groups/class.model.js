import mongoose from 'mongoose'

const ClassSchema = new mongoose.Schema({
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
  
const Class = mongoose.model("Class", ClassSchema);
  
const classModel = {
    Class,
};
  
export default classModel