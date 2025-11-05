import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    salary: { type: Number, required: true },
    skillsNeeded: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", JobSchema);

const jobModel = {
    Job,
};

export default jobModel