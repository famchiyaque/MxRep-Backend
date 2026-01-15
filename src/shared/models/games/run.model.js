import mongoose from 'mongoose'

const RunSchema = new mongoose.Schema({
    // References
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    configurationId: { type: mongoose.Schema.Types.ObjectId, ref: "GameConfiguration", required: true },
    code: { type: String, required: true },

    // Financial State
    currentCapital: { type: Number, required: true },
    totalRevenue: { type: Number, default: 0 },
    totalExpenses: { type: Number, default: 0 },
    
    // Time Simulation
    currentMonth: { type: Number, default: 1, min: 1 }, // Current month in simulation (1-12+)
    currentDay: { type: Number, default: 1, min: 1 }, // Current day in current month
    simulationSpeed: { type: Number, default: 1 }, // Time multiplier
    isPaused: { type: Boolean, default: false },
    
    // Production Lines
    lineIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Line" }],
    
    // Runtime Instances (what the team has purchased/hired)
    purchasedAssets: [{ type: mongoose.Schema.Types.ObjectId, ref: "PurchasedAsset" }],
    hiredEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: "HiredEmployee" }],
    recurringExpenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "RecurringExpense" }],
    inventoryItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" }],
    
    // Orders & Production
    activeOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    completedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    productionBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductionBatch" }],
    
    // Financial Records
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    
    // Performance Metrics
    score: { type: Number, default: 0 },
    metrics: {
        totalUnitsProduced: { type: Number, default: 0 },
        totalUnitsShipped: { type: Number, default: 0 },
        onTimeDeliveryRate: { type: Number, default: 0 },
        defectRate: { type: Number, default: 0 },
        utilizationRate: { type: Number, default: 0 },
    },
    
    // Status
    status: { type: String, enum: ["not-started", "in-progress", "paused", "completed", "abandoned"], default: "not-started" },
    startedAt: { type: Date },
    endedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Run = mongoose.model("Run", RunSchema);

const runModel = {
    Run,
};

export default runModel;