import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = async (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
}