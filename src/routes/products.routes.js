import { Router } from 'express';
import productDao from '../dao/mongoDB/product.dao.js';
import { passportCall } from '../middlewares/passport.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

router.get(
	'/',
	passportCall('jwt'),
	authorization('admin'),
	async (req, res) => {
		// Aquí lo que hay que hacer es que el usuario tenga que estar logueado para poder acceder a esta ruta --> por lo tanto hay que hacer POST en POSTMAN siempre en la ruta /auth/login definidas antes de acceder a los productos.
		try {
			const { limit, page, sort, category, status } = req.body; // Con nodemon se reiniciaría el token de las cookies, pero si no se loggea de nuevo, nunca podré ver el token real con el mío.

			const options = {
				limit: limit || 10,
				page: page || 1,
				sort: {
					price: sort === 'asc' ? 1 : -1,
				},
				learn: true,
			};

			// Si nos solicitan por categoría
			if (category) {
				const products = await productDao.getAll({ category }, options);
				return res.status(200).json({ status: 'success', products });
			}

			if (status) {
				const products = await productDao.getAll({ status }, options);
				return res.status(200).json({ status: 'success', products });
			}

			const products = await productDao.getAll({}, options);
			res.status(200).json({ status: 'success', products });
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ status: 'Erro', msg: 'Error interno del servidor' });
		}
	}
);

router.get('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const product = await productDao.getById(pid);
		if (!product)
			return res
				.status(404)
				.json({ status: 'Error', msg: 'Producto no encontrado' });

		res.status(200).json({ status: 'success', product });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

router.delete('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const product = await productDao.deleteOne(pid);
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
		res.status(500).json({ status: 'Erro', msg: 'Error interno del servidor' });
	}
});

router.put('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const productData = req.query;
		const product = await productDao.update(pid, productData);
		if (!product)
			return res
				.status(404)
				.json({ status: 'Error', msg: 'Producto no encontrado' });

		res.status(200).json({ status: 'success', product });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

router.patch('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const productData = req.query;

		const product = await productDao.update(pid, productData);
		if (!product)
			return res
				.status(404)
				.json({ status: 'Error', msg: 'Producto no encontrado' });

		res.status(200).json({ status: 'success', product });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

router.post(
	'/',
	/*  checkProductData, */ async (req, res) => {
		try {
			const productData = req.query; // Use req.query to access query parameters
			const product = await productDao.create(productData);

			res.status(201).json({ status: 'success', product });
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ status: 'Error', msg: 'Error interno del servidor' });
		}
	}
);
export default router;
