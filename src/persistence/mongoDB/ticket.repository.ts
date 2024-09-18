import { Document, PaginateResult } from 'mongoose';
import {
    ticketModel,
    TicketDocument,
} from '../../dao/mongoDB/models/ticket.model.js';

interface QueryOptions {
    [key: string]: any;
}

const getAll = async (
    query: QueryOptions,
    options: QueryOptions
): Promise<PaginateResult<TicketDocument>> => {
    const tickets = await ticketModel.paginate(query, options);
    return tickets;
};

const getById = async (id: string): Promise<TicketDocument | null> => {
    const ticket = await ticketModel.findById(id);
    return ticket;
};

const create = async (
    data: Partial<TicketDocument>
): Promise<TicketDocument> => {
    const ticket = await ticketModel.create(data);
    return ticket;
};

const update = async (
    id: string,
    data: Partial<TicketDocument>
): Promise<TicketDocument | null> => {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return ticketUpdate;
};

const deleteOne = async (id: string): Promise<TicketDocument | null> => {
    const ticket = await ticketModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    );
    return ticket;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};
