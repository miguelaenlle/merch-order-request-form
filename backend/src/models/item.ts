import mongoose, { Document } from "mongoose";

export interface IItem extends Document {
    name: string;
    description: string;
    pickupLocation: string;
    pickupTime: string;
}

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    pickupTime: { type: String, required: true }
});

const Item = mongoose.model<IItem>('items', itemSchema);

export default Item;
