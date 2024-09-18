import { Router } from 'express';
import passport from 'passport';
import userDao from '../dao/mongoDB/user.dao.js';

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const users = await userDao.getAll(); // Assuming getAll does not require any arguments
        res.status(200).json({ status: 'ok', users: [users] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
    }
});

router.post(
    '/register',
    passport.authenticate('register'),
    async (req, res) => {
        try {
            res.status(201).json({ status: 'ok', user: req.user });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'error',
                msg: 'Internal Server Error',
            });
        }
    }
);

export default router;
