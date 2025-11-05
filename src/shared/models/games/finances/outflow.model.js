import mongoose from 'mongoose'

const OutflowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["inventory", "asset", "salary", "expense", "other"], required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Outflow = mongoose.model("Outflow", OutflowSchema);

const outflowModel = {
    Outflow,
};

export default outflowModel