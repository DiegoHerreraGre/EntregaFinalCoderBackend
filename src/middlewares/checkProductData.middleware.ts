import { Request, Response, NextFunction } from 'express';
import productDao from '../dao/mongoDB/product.dao.js';

interface Product {
    title: string;
    description: string;
    price: number;
    code: string;
    stock: number;
    category: string;
}

export const checkProductData = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, description, price, code, stock, category } =
            req.body as Product;
        const newProduct: Product = {
            title,
            description,
            price,
            code,
            stock,
            category,
        };

        const products = await productDao.getAll();
        // Validar que no se repita el campo de code
        const productExists = products.docs.find(
            (p: Product) => p.code === code
        );
        if (productExists) {
            res.status(400).json({
                status: 'Error',
                msg: `El producto con el código ${code} ya existe`,
            });
            return;
        }

        // Validamos que los campos sean obligatorios
        const checkData = Object.values(newProduct).includes(undefined);
        if (checkData) {
            res.status(400).json({
                status: 'Error',
                msg: 'Todos los datos son obligatorios',
            });
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            msg: 'Error interno del servidor',
        });
    }
};
