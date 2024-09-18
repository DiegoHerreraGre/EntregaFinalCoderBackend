import {
    userModel,
    UserDocument,
} from '../../dao/mongoDB/models/user.model.js';
import { PaginateOptions, PaginateResult } from 'mongoose';

const getAll = async (
    query: any,
    options: PaginateOptions
): Promise<PaginateResult<UserDocument>> => {
    const users = await userModel.paginate(query, options);
    return users;
};

const getById = async (id: string): Promise<UserDocument | null> => {
    const user = await userModel.findById(id);
    return user;
};

const getByEmail = async (email: string): Promise<UserDocument | null> => {
    const user = await userModel.findOne({ email: email });
    return user;
};

const create = async (data: Partial<UserDocument>): Promise<UserDocument> => {
    const user = await userModel.create(data);
    return user;
};

const update = async (
    id: string,
    data: Partial<UserDocument>
): Promise<UserDocument | null> => {
    const userUpdate = await userModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return userUpdate;
};

const deleteOne = async (id: string): Promise<UserDocument | null> => {
    const user = await userModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    );
    return user;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    getByEmail,
};
