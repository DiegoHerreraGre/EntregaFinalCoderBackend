export const respProductDto = (product: any): void => {
    return {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
    };
};
