import {
    productModel,
    ProductDocument,
} from '../../dao/mongoDB/models/product.model.js';
import { PaginateOptions, PaginateResult } from 'mongoose';

const getAll = async (
    query: any,
    options: PaginateOptions
): Promise<PaginateResult<ProductDocument>> => {
    const products = await productModel.paginate(query, options);
    return products;
};

const getById = async (id: string): Promise<ProductDocument | null> => {
    const product = await productModel.findById(id);
    return product;
};

const create = async (
    data: Partial<ProductDocument>
): Promise<ProductDocument> => {
    const product = await productModel.create(data);
    return product;
};

const update = async (
    id: string,
    data: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
    const productUpdate = await productModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return productUpdate;
};

const deleteOne = async (id: string): Promise<ProductDocument | null> => {
    const product = await productModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    );
    return product;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};
