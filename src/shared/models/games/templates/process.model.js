import mongoose from 'mongoose'

const ProcessSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // Process Details
    name: { type: String, required: true },
    description: { type: String, required: true },
    sequenceOrder: { type: Number, default: 0 }, // Order in production line
    
    // Requirements
    requiredAssets: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssetTemplate" }],
    requiredJobs: [{ 
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        quantity: { type: Number, default: 1 }
    }],
    
    // Time & Performance
    durationMinutes: { type: Number, required: true, default: 30 },
    setupTimeMinutes: { type: Number, default: 0 },
    
    // Cost
    operatingCostPerRun: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now },
});

const Process = mongoose.model("Process", ProcessSchema);

const processModel = {
    Process,
};

export default processModel;