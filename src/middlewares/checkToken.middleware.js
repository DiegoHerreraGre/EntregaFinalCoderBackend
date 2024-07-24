import { request, response } from 'express';
import { verifyToken } from '../utils/jswt.js';

export const checkToken = async (req = request, res = response, next) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ message: 'Unauthorized' });

		const tokenData = verifyToken(token);
		req.user = tokenData;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};
