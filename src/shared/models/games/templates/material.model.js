import mongoose from 'mongoose'

const MaterialSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // Material Details
    name: { type: String, required: true },
    description: { type: String },
    unit: { type: String, default: "unit" }, // kg, liter, unit, etc.
    
    // Financial
    unitCost: { type: Number, required: true },
    
    // Supply Chain
    leadTimeDays: { type: Number, default: 1 },
    minimumOrderQuantity: { type: Number, default: 1 },
    supplier: { type: String },
    
    createdAt: { type: Date, default: Date.now },
});

const Material = mongoose.model("Material", MaterialSchema);

const materialModel = {
    Material,
};

export default materialModel;