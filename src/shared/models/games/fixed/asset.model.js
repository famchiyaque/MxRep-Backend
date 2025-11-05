import mongoose from 'mongoose'

const AssetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["machinery", "transportation", "building", "technology"], required: true },
    cost: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Asset = mongoose.model("Asset", AssetSchema);

const assetModel = {
    Asset,
};

export default assetModel