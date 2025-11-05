import mongoose from 'mongoose'

const AssetTemplateSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // Asset Details
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["machinery", "transportation", "building", "technology", "equipment"], required: true },
    
    // Financial
    purchaseCost: { type: Number, required: true },
    maintenanceCostPerMonth: { type: Number, default: 0 },
    salvageValue: { type: Number, default: 0 },
    usefulLifeYears: { type: Number, default: 10 },
    
    // Performance
    capacity: { type: Number }, // units per hour/day
    efficiency: { type: Number, default: 1.0 },
    
    createdAt: { type: Date, default: Date.now },
});

const AssetTemplate = mongoose.model("AssetTemplate", AssetTemplateSchema);

const assetTemplateModel = {
    AssetTemplate,
};

export default assetTemplateModel;