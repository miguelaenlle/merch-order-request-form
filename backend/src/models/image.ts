import mongoose, { Document } from "mongoose";

export interface IImage extends Document {
    itemId: string;
    imageUrl: string;
    isPrimary: boolean;
    order: number;
}

const imageSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'items'
    },
    imageUrl: { type: String, required: true },
    isPrimary: { type: Boolean, required: true },
    order: { type: Number, required: true }
});

const Image = mongoose.model<IImage>('images', imageSchema);

export default Image;