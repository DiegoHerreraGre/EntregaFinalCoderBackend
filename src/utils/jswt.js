import jwt from 'jsonwebtoken';
import envs from '../config/envs.config.js';

export var createToken = (user) => {
	var { _id, email } = user;
	var token = jwt.sign({ _id, email }, envs.JWT_SECRET_CODE, {
		expiresIn: '2m',
	});

	return token;
};

export var verifyToken = (token) => {
	try {
		var decoded = jwt.verify(token, envs.JWT_SECRET_CODE);
		return decoded;
	} catch (err) {
		return null;
	}
};
