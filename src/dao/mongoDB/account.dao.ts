import { Model, Document } from 'mongoose';
import { accountModel } from './models/account.model';

interface AccountData {
    name: string;
    lastName: string;
    _id?: string;
}

interface AccountDocument extends Document {
    alias: string;
    number: number;
    userId: string;
    balance: number;
}

const getAll = async (): Promise<AccountDocument[]> => {
    return await accountModel.find();
};

const getOne = async (query: object): Promise<AccountDocument | null> => {
    return await accountModel.findOne(query);
};

const create = async (data: AccountData): Promise<AccountDocument> => {
    const { name, lastName, _id = 'null' } = data;
    const accountNumber = Math.floor(Math.random() * 1000000000);
    const alias = `${name.toLowerCase()}${lastName.toLowerCase()}.${accountNumber
        .toString()
        .slice(-4)}`;
    const accountData = { alias, number: accountNumber, userId: _id };
    return await accountModel.create(accountData);
};

const update = async (
    id: string,
    data: Partial<AccountDocument>
): Promise<AccountDocument | null> => {
    return await accountModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id: string): Promise<AccountDocument | null> => {
    return await accountModel.findByIdAndDelete(id);
};

const depositAccount = async (
    id: string,
    amount: number
): Promise<AccountDocument> => {
    try {
        const account = await accountModel.findOne({ _id: id });
        if (!account) {
            throw new Error('Account not found');
        }

        account.balance += amount;
        await account.save();

        return account;
    } catch (error) {
        console.error('Error in depositAccount:', error);
        throw error;
    }
};

export default {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    depositAccount,
};
