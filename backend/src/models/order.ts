import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    orderNumber: number;
    customerName: string;
    customerEmail: string;
    customerType: string;
    school: string;
    notes: string;
}

const orderSchema = new mongoose.Schema({
    orderNumber: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerType: { type: String, required: true },
    school: { type: String },
    notes: { type: String }
});

const Order = mongoose.model<IOrder>('orders', orderSchema);

export default Order;
