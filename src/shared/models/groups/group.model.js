import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now },
});
  
const Group = mongoose.model("Group", GroupSchema);
  
const groupModel = {
    Group,
};
  
export default groupModel