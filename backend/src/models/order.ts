import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    itemOwnerId: mongoose.Schema.Types.ObjectId;
    userWhoPlacedOrderId: mongoose.Schema.Types.ObjectId;
    orderNumber: number;
    customerName: string;
    customerEmail: string;
    customerType: string;
    school: string;
    notes: string;
}

const orderSchema = new mongoose.Schema({
    itemOwnerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    userWhoPlacedOrderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    orderNumber: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerType: { type: String, required: true },
    school: { type: String },
    status: { type: String, required: true, default: 'pending' },
    notes: { type: String }
});

const Order = mongoose.model<IOrder>('orders', orderSchema);

export default Order;
