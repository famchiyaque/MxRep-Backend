import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // Job Details
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    description: { type: String },
    skillsNeeded: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    
    // Compensation
    baseSalary: { type: Number, required: true },
    
    createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", JobSchema);

const jobModel = {
    Job,
};

export default jobModel;