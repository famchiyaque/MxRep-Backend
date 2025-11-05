import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Skill = mongoose.model("Skill", SkillSchema);

const skillModel = {
    Skill,
};

export default skillModel