import ticketRepository from '../persistence/mongoDB/ticket.repository.ts';

interface Ticket {
    amount: number;
    purchaser: string;
    code: string;
}

const createTicket = async (
    userEmail: string,
    totalCart: number
): Promise<Ticket> => {
    const newTicket: Ticket = {
        amount: totalCart,
        purchaser: userEmail,
        code: Math.random().toString(36).substr(2, 9),
    };

    const ticket = await ticketRepository.create(newTicket);
    return ticket;
};

export default { createTicket };
