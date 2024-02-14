import mongoose, { Document } from "mongoose";

export interface IGroup extends Document {
    name: string;
}

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Group = mongoose.model<IGroup>('groups', groupSchema);

export default Group;