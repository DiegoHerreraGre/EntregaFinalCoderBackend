import mongoose, { Schema, Document } from 'mongoose';

const accountCollection: string = 'accounts';

interface IAccount extends Document {
    number: number;
    alias: string;
    balance: number;
    userId: string;
}

const accountSchema: Schema = new Schema({
    number: { type: Number, required: true },
    alias: { type: String, required: true },
    balance: { type: Number, default: 0 },
    userId: { type: String, required: true },
});

export const accountModel = mongoose.model<IAccount>(
    accountCollection,
    accountSchema
);
