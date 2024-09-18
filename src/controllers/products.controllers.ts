import { Request, Response, NextFunction } from 'express';
import productServices from '../services/product.services';

const getAllProducts = async (
    req: Request = {} as Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, page, sort, category, status } = req.query;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === 'asc' ? 1 : -1,
            },
            learn: true,
        };

        if (category) {
            const products = await productServices.getAllProducts(
                { category },
                options
            );
            return res.status(200).json({ status: 'success', products });
        }

        if (status) {
            const products = await productServices.getAllProducts(
                { status },
                options
            );
            return res.status(200).json({ status: 'success', products });
        }

        const products = await productServices.getAllProducts({}, options);
        res.status(200).json({ status: 'success', products });
    } catch (error) {
        console.log(error);
        next(error); // Pass the error to the next error handling middleware
    }
};

const getProductById = async (
    //+
    req: Request = {} as Request, //+
    res: Response, //+
    next: NextFunction //+
): Promise<any> => {
    //+
    try {
        //+
        const { pid } = req.params; //+
        const product = await productServices.getProductById(pid); //+
        //+
        if (!product) {
            //+
            return res //+
                .status(404) //+
                .json({ status: 'Error', msg: 'Producto no encontrado' }); //+
        } //+
        //+
        res.status(200).json({ status: 'success', product }); //+
    } catch (error) {
        //+
        console.log(error); //+
        next(error); //+
    } //+
}; //+

const updateProduct = async (
    req: Request = {} as Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const product = await productServices.updateProduct(pid, productData);
        if (!product)
            return res
                .status(404)
                .json({ status: 'Error', msg: 'Producto no encontrado' });

        res.status(200).json({ status: 'success', product });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const createProduct = async (
    req: Request = {} as Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const productData = req.body;
        const product = await productServices.createProduct(productData);

        res.status(201).json({ status: 'success', product });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { pid } = req.params;
        const product = await productServices.deleteProduct(pid);
        if (!product)
            return res
                .status(404)
                .json({ status: 'Error', msg: 'Producto no encontrado' });

        res.status(200).json({
            status: 'success',
            msg: `El producto con el id ${pid} fue eliminado`,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
