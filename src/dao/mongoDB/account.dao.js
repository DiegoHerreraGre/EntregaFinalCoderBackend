import { accountModel } from './models/account.model.js';

const getAll = async () => {
	return await accountModel.find();
};

const getOne = async (query) => {
	return await accountModel.findOne(query);
};

const create = async (data) => {
	const { name, lastName, _id = 'null' } = data;
	const accountNumber = Math.floor(Math.random() * 1000000000);
	const alias = `${name.toLowerCase()}${lastName.toLowerCase()}.${accountNumber
		.toString()
		.slice(-4)}`;
	const accountData = { alias, number: accountNumber, userId: _id };
	return await accountModel.create(accountData);
};

const update = async (id, data) => {
	return await accountModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
	return await accountModel.findByIdAndDelete(id, { new: true });
};

const depositAccount = async (id, amount) => {
	try {
		// Asegúrate de que el filtro sea un objeto
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
