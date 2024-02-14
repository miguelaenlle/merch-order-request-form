import mongoose, { Document } from "mongoose";

export interface IOrderItem extends Document {
    orderId: mongoose.Types.ObjectId;
    itemId: mongoose.Types.ObjectId;
    size: string;
    numOrdered: number;
}

const orderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' },
    size: { type: String, required: true },
    numOrdered: { type: Number, required: true }
});

const OrderItem = mongoose.model<IOrderItem>('order-items', orderItemSchema);

export default OrderItem;