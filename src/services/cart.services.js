import cartRepository from '../persistence/mongoDB/cart.repository.js';
import productRepository from '../persistence/mongoDB/product.repository.js';

const createCart = async () => {
	try {
		return await cartRepository.create();
	} catch (error) {
		// Handle the error here
		console.error('Error creating cart:', error);
		throw error; // Rethrow the error to propagate it to the caller
	}
};

const getCartById = async (cid) => {
	try {
		return await cartRepository.getById(cid);
	} catch (error) {
		console.error('Error getting cart by ID:', error);
		throw error;
	}
};

const addProductToCart = async (cid, pid) => {
	try {
		return await cartRepository.addProductToCart(cid, pid);
	} catch (error) {
		console.error('Error adding product to cart:', error);
		throw error;
	}
};

const deleteProductToCart = async (cid, pid) => {
	try {
		return await cartRepository.deleteProductToCart(cid, pid);
	} catch (error) {
		console.error('Error deleting product from cart:', error);
		throw error;
	}
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
	try {
		return await cartRepository.updateQuantityProductInCart(
			cid,
			pid,
			quantity,
		);
	} catch (error) {
		console.error('Error updating quantity of product in cart:', error);
		throw error;
	}
};

const clearProductsToCart = async (cid) => {
	try {
		return await cartRepository.clearProductsToCart(cid);
	} catch (error) {
		console.error('Error clearing products from cart:', error);
		throw error;
	}
};

const purchaseCart = async (cid) => {
	try {
		const cart = await cartRepository.getById(cid);
		let total = 0;
		const productsWithOutStock = [];

		for (const productCart of cart.products) {
			const product = await productRepository.getById(
				productCart.product,
			);

			if (product.stock >= productCart.quantity) {
				total += product.price * productCart.quantity;
				await productRepository.update(product._id, {
					stock: product.stock - productCart.quantity,
				});
			} else {
				productsWithOutStock.push(productCart);
			}

			await cartRepository.update(cid, {
				products: productsWithOutStock,
			});
		}

		return total;
	} catch (error) {
		console.error('Error purchasing cart:', error);
		throw error;
	}
};

export default {
	createCart,
	getCartById,
	addProductToCart,
	deleteProductToCart,
	updateQuantityProductInCart,
	clearProductsToCart,
	purchaseCart,
};
