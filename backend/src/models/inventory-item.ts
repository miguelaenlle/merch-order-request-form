import mongoose, { Document } from "mongoose";

export interface IInventoryItem extends Document {
    itemId: mongoose.Types.ObjectId;
    size: string;
    amount: number;
    price: number;
}

const inventoryItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'items'
    },
    size: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true }
});

const InventoryItem = mongoose.model<IInventoryItem>('inventory-items', inventoryItemSchema);

export default InventoryItem;
