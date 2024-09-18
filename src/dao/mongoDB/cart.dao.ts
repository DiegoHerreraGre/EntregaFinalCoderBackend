import { cartModel, CartDocument } from './models/cart.model';
import { productModel } from './models/product.model';

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
): Promise<CartDocument | null> => {
    const cart = await cartModel.findById(cid);

    if (cart) {
        const productInCart = cart.products.find(
            (element) => element.product.toString() === pid
        );
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
    }
    return cart;
};

const deleteProductToCart = async (
    cid: string,
    pid: string
): Promise<CartDocument | null> => {
    const cart = await cartModel.findById(cid);

    if (cart) {
        cart.products = cart.products.filter(
            (element) => element.product.toString() !== pid
        );
        await cart.save();
    }

    return cart;
};

const updateQuantityProductInCart = async (
    cid: string,
    pid: string,
    quantity: number
): Promise<CartDocument | null> => {
    const cart = await cartModel.findById(cid);
    if (cart) {
        const product = cart.products.find(
            (element) => element.product.toString() === pid
        );
        if (product) {
            product.quantity = quantity;
            await cart.save();
        }
    }
    return cart;
};

const clearProductsToCart = async (
    cid: string
): Promise<CartDocument | null> => {
    const cart = await cartModel.findById(cid);
    if (cart) {
        cart.products = [];
        await cart.save();
    }
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
