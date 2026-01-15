import mongoose from 'mongoose'

const ProductionBatchSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    lineId: { type: mongoose.Schema.Types.ObjectId, ref: "Line", required: true },
    bomId: { type: mongoose.Schema.Types.ObjectId, ref: "BOM", required: true },
    
    // Batch Details
    batchNumber: { type: String, required: true },
    targetQuantity: { type: Number, required: true },
    producedQuantity: { type: Number, default: 0 },
    defectQuantity: { type: Number, default: 0 },
    
    // Status
    status: { 
        type: String, 
        enum: ["queued", "in-progress", "completed", "cancelled", "failed"], 
        default: "queued" 
    },
    currentProcessStationId: { type: mongoose.Schema.Types.ObjectId, ref: "ProcessStation" },
    
    // Process Tracking
    processStages: [{
        processStationId: { type: mongoose.Schema.Types.ObjectId, ref: "ProcessStation" },
        status: { type: String, enum: ["pending", "in-progress", "completed", "failed"] },
        startTime: { type: Date },
        endTime: { type: Date },
        duration: { type: Number }, // minutes
        employeesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "HiredEmployee" }],
        defects: { type: Number, default: 0 },
    }],
    
    // Time Tracking
    scheduledStartTime: { type: Date },
    actualStartTime: { type: Date },
    estimatedCompletionTime: { type: Date },
    actualCompletionTime: { type: Date },
    totalProductionTime: { type: Number, default: 0 }, // minutes
    
    // Cost Tracking
    materialCost: { type: Number, default: 0 },
    laborCost: { type: Number, default: 0 },
    overheadCost: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    
    // Quality
    qualityScore: { type: Number, default: 100 },
    qualityChecks: [{
        checkDate: { type: Date },
        inspector: { type: String },
        passed: { type: Boolean },
        notes: { type: String },
    }],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ProductionBatch = mongoose.model("ProductionBatch", ProductionBatchSchema);

const productionBatchModel = {
    ProductionBatch,
};

export default productionBatchModel;

