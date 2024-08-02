import { Router } from 'express';
import accountDao from '../dao/mongoDB/account.dao.js';

const router = Router();

router.get('/accounts', async (req, res) => {
	try {
		const accounts = await accountDao.getAll();
		res.status(200).json({ status: 'success', accounts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
});

router.post('/accounts', async (req, res) => {
	try {
		const { name, lastName, _id } = req.body;

		const account = await accountDao.create({ name, lastName, _id });

		res.status(201).json({ status: 'success', account });
	} catch (error) {
		console.error('Error creating account:', error);
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: error.message,
		});
	}
});

router.put('/accounts/:id/deposit', async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;

    const account = await accountDao.depositAccount(id, amount);

    res.status(200).json({ status: 'success', account });
  } catch (error) {
    console.error('Error processing deposit:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: error.message,
      stack: error.stack,
    });
  }
});

export default router;
