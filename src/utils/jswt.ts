import jwt from 'jsonwebtoken';
import envs from '../config/envs.config.js';

interface User {
    _id: string;
    email: string;
    role: string;
    cart: any; // You might want to define a more specific type for cart
}

export const createToken = (user: User): string => {
    const { _id, email, role, cart } = user;
    const token = jwt.sign({ _id, email, role, cart }, envs.JWT_SECRET_CODE, {
        expiresIn: '2m',
    });

    return token;
};

export const verifyToken = (token: string): jwt.JwtPayload | null => {
    try {
        const decoded = jwt.verify(
            token,
            envs.JWT_SECRET_CODE
        ) as jwt.JwtPayload;
        return decoded;
    } catch (error) {
        return null;
    }
};
