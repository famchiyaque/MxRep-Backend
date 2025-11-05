// BOM {
//     string _id
//     string productName
//     string[] requiredMaterials
//     number materialCost
// }

import mongoose from 'mongoose'

const BOMSchema = new mongoose.Schema({
    name: { type: String, required: true },
    requiredMaterials: [
        {
          material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
    ],
    processes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Process" }],
    createdAt: { type: Date, default: Date.now },
});

const BOM = mongoose.model("BOM", BOMSchema);

const bomModel = {
    BOM,
};

export default bomModel