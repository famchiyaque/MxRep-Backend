import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    bomId: { type: mongoose.Schema.Types.ObjectId, ref: "BOM", required: true },
    
    // Order Details
    orderNumber: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    
    // Dates
    orderDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    completedDate: { type: Date },
    shippedDate: { type: Date },
    
    // Production Status
    status: { 
        type: String, 
        enum: ["pending", "in-production", "completed", "shipped", "cancelled", "late"], 
        default: "pending" 
    },
    quantityProduced: { type: Number, default: 0 },
    quantityShipped: { type: Number, default: 0 },
    
    // Quality
    defectCount: { type: Number, default: 0 },
    qualityScore: { type: Number, default: 100 },
    
    // Financial
    productionCost: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    
    // Penalties/Bonuses
    latePenalty: { type: Number, default: 0 },
    earlyBonus: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

const orderModel = {
    Order,
};

export default orderModel;

