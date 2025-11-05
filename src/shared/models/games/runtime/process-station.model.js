import mongoose from 'mongoose'

const ProcessStationSchema = new mongoose.Schema({
    // References
    lineId: { type: mongoose.Schema.Types.ObjectId, ref: "Line", required: true },
    processTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: "Process", required: true },
    
    // Station Details
    stationName: { type: String, required: true },
    stationNumber: { type: Number, required: true },
    sequenceOrder: { type: Number, required: true },
    
    // Assigned Resources
    assignedAssets: [{ type: mongoose.Schema.Types.ObjectId, ref: "PurchasedAsset" }],
    assignedEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: "HiredEmployee" }],
    
    // Performance
    status: { 
        type: String, 
        enum: ["idle", "running", "blocked", "maintenance", "broken"], 
        default: "idle" 
    },
    efficiency: { type: Number, default: 1.0 },
    utilizationRate: { type: Number, default: 0 },
    
    // Production Tracking
    totalUnitsProcessed: { type: Number, default: 0 },
    totalOperatingTime: { type: Number, default: 0 },
    totalDowntime: { type: Number, default: 0 },
    defectCount: { type: Number, default: 0 },
    
    // Current Work
    currentBatchId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductionBatch" },
    queuedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductionBatch" }],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ProcessStation = mongoose.model("ProcessStation", ProcessStationSchema);

const processStationModel = {
    ProcessStation,
};

export default processStationModel;

