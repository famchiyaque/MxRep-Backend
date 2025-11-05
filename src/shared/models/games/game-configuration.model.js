import mongoose from 'mongoose'

const GameConfigurationSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    premisesConfigId: { type: mongoose.Schema.Types.ObjectId, ref: "PremisesConfig", required: true },
    ordersConfigId: { type: mongoose.Schema.Types.ObjectId, ref: "OrdersConfig", required: true },
    availableMachineryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machinery" }],
    availableEmployeeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    availableBOMIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "BOM" }],
    availableExpenseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
    createdAt: { type: Date, default: Date.now },
});

const GameConfiguration = mongoose.model("GameConfiguration", GameConfigurationSchema);

const gameConfigurationModel = {
    GameConfiguration,
};

export default gameConfigurationModel