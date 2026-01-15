// ORDER_CONFIG {
//     string _id
//     {}[month: number, orders: number] ordersByMonth
// }

import mongoose from 'mongoose'

const OrdersConfigSchema = new mongoose.Schema({
    ordersPerYear: { type: Number, default: 100000 },
    ordersByMonth: {
        january: { type: Number, default: 0.08 },
        february: { type: Number, default: 0.09 },
        march: { type: Number, default: 0.09 },
        april: { type: Number, default: 0.08 },
        may: { type: Number, default: 0.08 },
        june: { type: Number, default: 0.08 },
        july: { type: Number, default: 0.08 },
        august: { type: Number, default: 0.09 },
        september: { type: Number, default: 0.09 },
        october: { type: Number, default: 0.08 },
        november: { type: Number, default: 0.08 },
        december: { type: Number, default: 0.08 },
    },
    createdAt: { type: Date, default: Date.now },
});

const OrdersConfig = mongoose.model("OrdersConfig", OrdersConfigSchema);

const ordersConfigModel = {
    OrdersConfig,
};

export default ordersConfigModel;