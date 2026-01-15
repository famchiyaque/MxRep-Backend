import mongoose from 'mongoose'

const InventoryItemSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    
    // Inventory Details
    quantity: { type: Number, required: true, default: 0 },
    reservedQuantity: { type: Number, default: 0 }, // Reserved for production
    availableQuantity: { type: Number, default: 0 }, // Available to use
    
    // Location
    warehouseLocation: { type: String },
    
    // Cost Tracking (for accounting)
    averageUnitCost: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    
    // Reorder Management
    reorderPoint: { type: Number, default: 0 },
    reorderQuantity: { type: Number, default: 0 },
    
    // Status
    lastRestocked: { type: Date },
    expirationDate: { type: Date },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

const inventoryItemModel = {
    InventoryItem,
};

export default inventoryItemModel;

