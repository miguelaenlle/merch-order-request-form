import mongoose, { Document } from "mongoose";

export interface IItem extends Document {
    name: string;
    description: string;
    pickupLocation: string;
    pickupTime: string;
    itemOwnerId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
}

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    pickupTime: { type: String, required: true },
    itemOwnerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
});

const Item = mongoose.model<IItem>('items', itemSchema);

export default Item;
