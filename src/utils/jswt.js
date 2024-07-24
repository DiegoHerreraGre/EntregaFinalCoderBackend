import jwt from 'jsonwebtoken';
import envs from '../config/envs.config.js';

export const createToken = (user) => {
	let { _id, email } = user;
	let token = jwt.sign({ _id, email, role }, envs.JWT_SECRET_CODE, {
		expiresIn: '2m',
	});

	return token;
};

export const verifyToken = (token) => {
	try {
		var decoded = jwt.verify(token, envs.JWT_SECRET_CODE);
		return decoded;
	} catch (err) {
		return null;
	}
};
