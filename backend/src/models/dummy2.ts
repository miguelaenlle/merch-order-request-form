// This is just a sample to demonstrate the structure of the project

import mongoose from "mongoose";

export interface IDummy extends Document {
    name: string;
    email: string;
}

const dummySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

const Dummy = mongoose.model<IDummy>('Dummy', dummySchema);

export default Dummy;