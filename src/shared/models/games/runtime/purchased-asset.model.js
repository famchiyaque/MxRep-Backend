import mongoose from 'mongoose'

const PurchasedAssetSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    assetTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: "AssetTemplate", required: true },
    
    // Asset Instance Details
    assetName: { type: String, required: true },
    assetNumber: { type: String }, // Internal tracking number
    
    // Financial
    purchasePrice: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    accumulatedDepreciation: { type: Number, default: 0 },
    salvageValue: { type: Number, default: 0 },
    
    // Status & Location
    status: { 
        type: String, 
        enum: ["active", "maintenance", "broken", "idle", "sold"], 
        default: "active" 
    },
    location: { type: String },
    assignedToLineId: { type: mongoose.Schema.Types.ObjectId, ref: "Line" },
    
    // Performance Tracking
    totalOperatingHours: { type: Number, default: 0 },
    maintenanceHistory: [{
        date: { type: Date },
        type: { type: String },
        cost: { type: Number },
        description: { type: String },
    }],
    
    // Dates
    purchaseDate: { type: Date, required: true },
    lastMaintenanceDate: { type: Date },
    nextMaintenanceDate: { type: Date },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const PurchasedAsset = mongoose.model("PurchasedAsset", PurchasedAssetSchema);

const purchasedAssetModel = {
    PurchasedAsset,
};

export default purchasedAssetModel;

