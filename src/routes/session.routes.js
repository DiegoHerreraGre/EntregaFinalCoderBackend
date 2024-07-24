import { Router } from 'express';
import userDao from '../dao/mongoDB/user.dao.js';
import passport from 'passport';
import { createToken } from '../utils/jswt.js';
import { isValidPassword } from '../utils/hashPassword.js';
import { passportCall } from '../middlewares/passport.middleware.js';

const router = Router();

router.post(
	'/register',
	passportCall('register'), // Aquí el profe hizo un cambio y no lo vi, luego revisarlo en el Github
	async (req, res) => {
		try {
			res.status(201).json({ status: 'ok', message: 'User created' });
			const token = createToken(req.user);
			res.cookie('token', token, { httpOnly: true });
		} catch (error) {
			console.log(error);
			res.status(500).json({ status: 'error', msg: 'Internal server error' });
		}
	}
);

router.post('/login', passportCall('login'), (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.status(200).json({ message: 'Login successful', user });
		});
	})(req, res, next);
});

router.post('/auth', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userDao.getByEmail(email);
		if (!user || !isValidPassword(password, user.password))
			return res
				.status(401)
				.json({ status: 'error', msg: 'User or email invalid' });
		console.log(user);
		const token = createToken(user);

		res.cookie('token', token, { httpOnly: true });
		return res.status(200).json({ status: 'ok', token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', msg: 'Internal server error' });
	}
});

router.get('/google', (req, res, next) => {
	passport.authenticate(
		'google',
		{
			scope: [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
			],
		},
		async (err, user, info) => {
			if (err) return next(err);
			if (!user) return res.status(401).json({ message: 'Unauthorized' });

			req.logIn(user, (err) => {
				if (err) return next(err);
				return res.status(200).json({ message: 'Login successful', user });
			});
		}
	)(req, res, next);
});

router.get(
	'/current',
	passportCall('jwt'),
	async (req, res) => {
		const user = await userDao.getByEmail(req.session.user.email);
		res.status(200).json({ status: 'ok', user });
	}
);

export default router;
