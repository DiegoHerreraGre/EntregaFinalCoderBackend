import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import cartDao from '../dao/mongoDB/cart.dao.js';
import userDao from '../dao/mongoDB/user.dao.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';
import envs from './envs.config.js';
import { verifyToken } from '../utils/jswt.js';

export const initializePassport = (): void => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (
                req: any,
                username: string,
                password: string,
                done: Function
            ): Promise<void> => {
                try {
                    const { first_name, last_name, age, role } = req.query;
                    const user = await userDao.getByEmail(username);
                    if (user)
                        return done(
                            { status: 'ERROR', code: 'USER_EXISTS' },
                            false,
                            {
                                message: 'User already exists',
                            }
                        );

                    const cart = await cartDao.create();
                    const newUser = {
                        first_name,
                        last_name,
                        password: createHash(password),
                        email: username,
                        age,
                        role,
                        cart: cart._id,
                    };

                    const userCreate = await userDao.create(newUser);

                    return done(null, userCreate);
                } catch (error: any) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (username: string, password: string, done: Function) => {
                try {
                    const user = await userDao.getByEmail(username);

                    if (!user || !isValidPassword(user.password, password))
                        return done(null, false, {
                            message: 'User or email invalid',
                        });

                    return done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use(
        'google',
        new GoogleStrategy(
            {
                clientID: envs.GOOGLE_CLIENT_ID,
                clientSecret: envs.GOOGLE_CLIENT_SECRET,
                callbackURL: 'http://localhost:8080/api/session/google',
            },
            async (
                accessToken: string,
                refreshToken: string,
                profile: any,
                cb: Function
            ) => {
                try {
                    const { name, emails } = profile;
                    const user = await userDao.getByEmail(emails[0].value);

                    if (user) {
                        return cb(null, user);
                    } else {
                        const newUser = {
                            first_name: name.givenName,
                            last_name: name.familyName,
                            email: emails[0].value,
                        };

                        const userCreate = await userDao.create(newUser);
                        return cb(null, userCreate);
                    }
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: envs.JWT_SECRET_CODE,
            },
            async (jwt_payload: any, done: Function) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'current',
        new CustomStrategy(async (req: any, done: Function) => {
            try {
                const token = cookieExtractor(req);
                if (!token) return done(null, false);
                const tokenVerify = verifyToken(token);
                if (!tokenVerify) return done(null, false);
                const user = await userDao.getByEmail(tokenVerify.email);
                done(null, user);
            } catch (error) {
                done(error);
            }
        })
    );

    passport.serializeUser((user: any, done: Function) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id: string, done: Function) => {
        try {
            const user = await userDao.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
