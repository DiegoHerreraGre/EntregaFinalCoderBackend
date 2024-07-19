import passport from 'passport';
import local from 'passport-local';
import userDao from '../dao/mongoDB/user.dao.js';
import { hashPassword } from '../utils/hashPassword.js';
import bcrypt from 'bcrypt';
import envs from './envs.config.js';
import googlePassport from 'passport-google-oauth20';

const localStrategy = local.Strategy;
const googleStrategy = googlePassport.Strategy;

export const initializePassport = () => {
	passport.use(
		'register', // nombre de la estrategia
		new localStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, username, password, done) => {
				try {
					const { first_name, last_name, email: username, age } = req.query;
					const user = await userDao.getByEmail(username);

					if (user)
						return done(null, false, { message: 'User already exists' });

					const hashedPassword = await hashPassword(password); // Espera a que la contraseña se hashee

					const newUser = {
						first_name: first_name,
						last_name: last_name,
						password: hashedPassword, // Usa la contraseña hasheada
						email: username,
						age: age,
					};

					const userCreate = await userDao.create(newUser);
					return done(null, userCreate);
				} catch (err) {
					console.error(err);
					done(err);
				}
			}
		)
	);
};

passport.use(
	'login',
	new localStrategy(
		{ usernameField: 'email' },
		async (username, password, done) => {
			try {
				const user = await userDao.getByEmail(username);
				if (!user) return done(null, false, { message: 'User not found' });

				const isPasswordValid = await bcrypt.compare(password, user.password);
				if (!isPasswordValid)
					return done(null, false, { message: 'email or password incorrect' });

				return done(null, user);
			} catch (err) {
				console.error(err);
				done(err);
			}
		}
	)
);

passport.use(
	'google',
	new googleStrategy(
		{
			clientID: envs.GOOGLE_CLIENT_ID,
			clientSecret: envs.GOOGLE_CLIENT_SECRET,
			callbackURL:
				'http://localhost:8080/api/session/google' /*  '/auth/google/callback' */,
		},
		async (accessToken, refreshToken, profile, cb) => {
			// cb es callback y funciona igual que done para este caso
			try {
				var { id, name, emails } = profile;
				var user = await userDao.getByEmail(emails[0].value);
				if (user) {
					return (cb, user)
				} else {
					var newUser = {
						first_name: name.givenName,
						last_name: name.familyName,
						password: null,
						email: emails[0].value,
						age: null,
					}

					var userCreate = await userDao.create(newUser);
					return (cb, userCreate);
				}
			} catch (err) {
				console.error(err);
				cb(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await userDao.getById(id);
		done(null, user);
	} catch (err) {
		console.error(err);
		done(err);
	}
});
