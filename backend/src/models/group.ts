import mongoose, { Document } from "mongoose";

export interface IGroup extends Document {
    name: string;
}

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
});

const Group = mongoose.model<IGroup>('groups', groupSchema);

export default Group;