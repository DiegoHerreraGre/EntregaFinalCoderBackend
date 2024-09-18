import mongoose, { Schema, Document } from 'mongoose';

const ticketCollection = 'ticket';

interface ITicket extends Document {
    code: string;
    purchase_datatime: Date;
    amount: number;
    purchaser: string;
}

const ticketSchema = new Schema({
    code: { type: String, required: true, unique: true },
    purchase_datatime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

export type TicketDocument = mongoose.Document & ITicket;

export const ticketModel = mongoose.model<TicketDocument>(
    ticketCollection,
    ticketSchema
);
