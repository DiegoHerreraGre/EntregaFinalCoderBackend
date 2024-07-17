import { Router } from 'express';
import userDao from '../dao/mongoDB/user.dao.js';
import passport from 'passport';

const router = Router();

router.post(
	'/register',
	passport.authenticate('register'),
	async (req, res) => {
		try {
			res.status(201).json({ status: 'ok', message: 'User created' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ status: 'error', msg: 'Internal server error' });
		}
	}
);

router.post('/login', (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.status(200).json({ message: 'Login successful', user });
		});
	})(req, res, next);
});

router.get('/current', async (req, res) => {
	const user = await userDao.getByEmail(req.session.user.email);

	res.status(200).json({ status: 'ok', user });
});

export default router;
