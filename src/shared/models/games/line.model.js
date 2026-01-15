import mongoose from 'mongoose'

const LineSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    bomId: { type: mongoose.Schema.Types.ObjectId, ref: "BOM" }, // What this line produces
    
    // Line Details
    name: { type: String, required: true },
    description: { type: String },
    lineNumber: { type: Number },
    
    // Process Stations (configured processes for this line)
    processStations: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProcessStation" }],
    
    // Performance
    status: { 
        type: String, 
        enum: ["idle", "running", "paused", "maintenance", "shutdown"], 
        default: "idle" 
    },
    efficiency: { type: Number, default: 1.0 },
    utilizationRate: { type: Number, default: 0 },
    
    // Production Tracking
    totalUnitsProduced: { type: Number, default: 0 },
    currentBatchId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductionBatch" },
    queuedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductionBatch" }],
    
    // Dates
    startedAt: { type: Date },
    endedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Line = mongoose.model("Line", LineSchema);

const lineModel = {
    Line,
};

export default lineModel;