import { respProductDto } from '../dto/product.dto.js';
import productRepository from '../persistence/mongoDB/product.repository.js';

interface ProductData {
    // Define the structure of productData
}

interface Query {
    // Define the structure of query
}

interface Options {
    // Define the structure of options
}

const getAllProducts = async (query: Query, options: Options) => {
    return await productRepository.getAll(query, options);
};

const getProductById = async (pid: string) => {
    const product = await productRepository.getById(pid);
    const productResponse = respProductDto(product);
    return productResponse;
};

const updateProduct = async (
    pid: string,
    productData: Partial<ProductData>
) => {
    return await productRepository.update(pid, productData);
};

const createProduct = async (productData: ProductData) => {
    return await productRepository.create(productData);
};

const deleteProduct = async (pid: string) => {
    return await productRepository.deleteOne(pid);
};

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
