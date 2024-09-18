import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'product';

interface IProduct {
    title: string;
    description: string;
    price: number;
    thumbnail: string[];
    code: string;
    stock: number;
    category: string;
    status: boolean;
}

export interface ProductDocument extends IProduct, Document {}

const productSchema = new Schema<ProductDocument>({
    title: String,
    description: String,
    price: Number,
    thumbnail: {
        type: [String],
        default: [],
    },
    code: String,
    stock: Number,
    category: String,
    status: {
        type: Boolean,
        default: true,
    },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model<ProductDocument>(
    productCollection,
    productSchema
);
