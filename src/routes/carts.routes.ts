import { Router } from 'express';
import cartDao from '../dao/mongoDB/cart.dao';
import productDao from '../dao/mongoDB/product.dao';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const cart = await cartDao.create();

        res.status(201).json({ status: 'success', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        if (!cart)
            return res
                .status(404)
                .json({ status: 'Error', msg: 'Cart not found' });

        res.status(200).json({ status: 'success', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = await productDao.getById(pid);
        if (!product)
            return res.status(404).json({
                status: 'Error',
                msg: `Product with id ${pid} not found`,
            });
        const cart = await cartDao.getById(cid);
        if (!cart)
            return res.status(404).json({
                status: 'Error',
                msg: `Cart with id ${cid} not found`,
            });

        const cartUpdate = await cartDao.addProductToCart(cid, pid);

        res.status(200).json({ status: 'success', payload: cartUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = await productDao.getById(pid);
        if (!product)
            return res.status(404).json({
                status: 'Error',
                msg: `Product with id ${pid} not found`,
            });
        const cart = await cartDao.getById(cid);
        if (!cart)
            return res.status(404).json({
                status: 'Error',
                msg: `Cart with id ${cid} not found`,
            });

        const cartUpdate = await cartDao.deleteProductToCart(cid, pid);

        res.status(200).json({ status: 'success', payload: cartUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.query;

        const product = await productDao.getById(pid);
        if (!product)
            return res.status(404).json({
                status: 'Error',
                msg: `Product with id ${pid} not found`,
            });
        const cart = await cartDao.getById(cid);
        if (!cart)
            return res.status(404).json({
                status: 'Error',
                msg: `Cart with id ${cid} not found`,
            });

        const cartUpdate = await cartDao.updateQuantityProductInCart(
            cid,
            pid,
            Number(quantity)
        );

        res.status(200).json({ status: 'success', payload: cartUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.clearProductsToCart(cid);
        if (!cart)
            return res
                .status(404)
                .json({ status: 'Error', msg: 'Cart not found' });

        res.status(200).json({ status: 'success', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

export default router;
