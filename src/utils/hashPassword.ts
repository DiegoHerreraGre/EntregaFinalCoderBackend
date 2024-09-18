import bcrypt from 'bcrypt';

// Hasheo de contraseña
export const createHash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Validar las contraseñas
export const isValidPassword = (
    userPassword: string,
    password: string
): boolean => {
    return bcrypt.compareSync(password, userPassword);
};
