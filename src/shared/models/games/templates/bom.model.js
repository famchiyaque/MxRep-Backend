// BOM {
//     string _id
//     string productName
//     string[] requiredMaterials
//     number materialCost
// }

import mongoose from 'mongoose'

const BOMSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // BOM Details
    name: { type: String, required: true },
    description: { type: String },
    
    // Production Details
    requiredMaterials: [
        {
          material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
    ],
    processes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Process" }],
    productionTimeMinutes: { type: Number, required: true, default: 60 },
    
    // Financial
    sellingPrice: { type: Number, required: true, default: 0 },
    
    createdAt: { type: Date, default: Date.now },
});

const BOM = mongoose.model("BOM", BOMSchema);

const bomModel = {
    BOM,
};

export default bomModel;