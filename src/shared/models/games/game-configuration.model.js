import mongoose from 'mongoose'

const GameConfigurationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    
    // Financial settings
    initialCapital: { type: Number, default: 1000000 },
    gameDurationMonths: { type: Number, default: 12 },
    
    // Configuration references
    premisesConfigId: { type: mongoose.Schema.Types.ObjectId, ref: "PremisesConfig", required: true },
    ordersConfigId: { type: mongoose.Schema.Types.ObjectId, ref: "OrdersConfig", required: true },
    
    // Available templates for this game
    availableAssetIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
    availableEmployeeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmployeeTemplate" }],
    availableBOMIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "BOM" }],
    availableExpenseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExpenseTemplate" }],
    availableMaterialIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
    availableProcessIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Process" }],
    
    createdAt: { type: Date, default: Date.now },
});

const GameConfiguration = mongoose.model("GameConfiguration", GameConfigurationSchema);

const gameConfigurationModel = {
    GameConfiguration,
};

export default gameConfigurationModel;