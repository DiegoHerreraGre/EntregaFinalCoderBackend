import { NextFunction, Request, Response } from 'express';
import productDao from '../dao/mongoDB/product.dao.js';

export const checkProductData = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category,
        };

        const products = await productDao.getAll();
        // Validar que no se repita el campo de code
        const productExists = products.docs.find((p: any) => p.code === code);
        if (productExists) {
            res.status(400).json({
                status: 'Error',
                msg: `El producto con el código ${code} ya existe`,
            });
            return;
        }

        // Validamos que los campos sean obligatorios
        const checkData = Object.values(newProduct).some(
            (value) => value === undefined
        );
        if (checkData) {
            res.status(400).json({
                status: 'Error',
                msg: 'Todos los datos son obligatorios',
            });
            return;
        }

        next();
    } catch (error) {
        console.error('Error en checkProductData:', error);
        res.status(500).json({
            status: 'Error',
            msg: 'Error interno del servidor',
        });
    }
};
