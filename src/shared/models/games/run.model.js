import mongoose from 'mongoose'

const RunSchema = new mongoose.Schema({
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    configurationId: { type: mongoose.Schema.Types.ObjectId, ref: "GameConfiguration", required: true },
    lineIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Line" }],
    teamCapital: { type: Number, default: 0 },
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
    inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    inflows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inflow" }],
    outflows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outflow" }],
    status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
    startedAt: { type: Date },
    endedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Run = mongoose.model("Run", RunSchema);

const runModel = {
    Run,
};

export default runModel