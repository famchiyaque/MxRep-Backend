import mongoose from 'mongoose'

const InflowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["sales", "investments", "loans", "other"], required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Inflow = mongoose.model("Inflow", InflowSchema);

const inflowModel = {
    Inflow,
};

export default inflowModel