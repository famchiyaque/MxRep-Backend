import mongoose from 'mongoose'

const OrderConfigSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "BOM", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "active", "finished", "cancelled"], default: "pending" },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const OrderConfig = mongoose.model("OrderConfig", OrderConfigSchema);

const orderConfigModel = {
    OrderConfig,
};