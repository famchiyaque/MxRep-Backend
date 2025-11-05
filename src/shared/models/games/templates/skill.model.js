import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "system" },
    
    // Skill Details
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String }, // e.g., "technical", "management", "quality-control"
    
    createdAt: { type: Date, default: Date.now },
});

const Skill = mongoose.model("Skill", SkillSchema);

const skillModel = {
    Skill,
};

export default skillModel;