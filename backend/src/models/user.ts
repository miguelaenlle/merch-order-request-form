import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    emailConfirmed: boolean;
    emailConfirmationCode: string;
    emailConfirmationCodeDate: string;
    group: string;
    resetToken?: String;
    resetTokenExpiration?: Date;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    emailConfirmed: { type: Boolean, required: true, default: false },
    emailConfirmationCode: { type: String, required: true },
    emailConfirmationCodeDate: { type: String, required: true },
    group: { type: String, required: true, default: "buyer" },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date }
});

const User = mongoose.model<IUser>('users', userSchema);

export default User;
