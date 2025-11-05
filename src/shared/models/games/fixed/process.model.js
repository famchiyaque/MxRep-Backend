import mongoose from 'mongoose'

const ProcessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    requiredAssets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
    requiredJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    createdAt: { type: Date, default: Date.now },
});

const Process = mongoose.model("Process", ProcessSchema);

const processModel = {
    Process,
};

export default processModel