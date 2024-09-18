import { cartModel, CartDocument } from '../../dao/mongoDB/models/cart.model';
import { productModel } from '../../dao/mongoDB/models/product.model';
import { Types } from 'mongoose';

const getAll = async (): Promise<CartDocument[]> => {
    const carts = await cartModel.find();
    return carts;
};

const getById = async (id: string): Promise<CartDocument | null> => {
    const cart = await cartModel.findById(id).populate('products.product');
    return cart;
};

const create = async (): Promise<CartDocument> => {
    const cart = await cartModel.create({});
    return cart;
};

const update = async (
    id: string,
    data: Partial<CartDocument>
): Promise<CartDocument | null> => {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return cartUpdate;
};

const deleteOne = async (id: string): Promise<{ deletedCount: number }> => {
    const cart = await cartModel.deleteOne({ _id: id });
    return cart;
};

const addProductToCart = async (
    cid: string,
    pid: string
): Promise<CartDocument> => {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Cart not found');

    const productInCart = cart.products.find(
        (element) => element.product.toString() === pid
    );
    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.products.push({ product: new Types.ObjectId(pid), quantity: 1 });
    }

    await cart.save(); // Guardamos los cambios realizado en la base de datos de mongo
    return cart;
};

const deleteProductToCart = async (
    cid: string,
    pid: string
): Promise<CartDocument> => {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Cart not found');

    cart.products = cart.products.filter(
        (element) => element.product.toString() !== pid
    );

    await cart.save();

    return cart;
};

const updateQuantityProductInCart = async (
    cid: string,
    pid: string,
    quantity: number
): Promise<CartDocument> => {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Cart not found');

    const product = cart.products.find(
        (element) => element.product.toString() === pid
    );
    if (!product) throw new Error('Product not found in cart');
    product.quantity = quantity;

    await cart.save();
    return cart;
};

const clearProductsToCart = async (cid: string): Promise<CartDocument> => {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Cart not found');
    cart.products = [];

    await cart.save();

    return cart;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
};
