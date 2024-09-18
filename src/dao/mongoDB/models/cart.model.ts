import mongoose, { Schema, Document } from 'mongoose';

const cartCollection: string = 'cart';

interface ICartProduct {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface CartDocument extends Document {
    products: ICartProduct[];
}

const cartSchema: Schema<CartDocument> = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                },
                quantity: Number,
            },
        ],
        default: [],
    },
});

cartSchema.pre('find', function (this: mongoose.Query<any, CartDocument>) {
    this.populate('products.product');
});

export const cartModel = mongoose.model<CartDocument>(
    cartCollection,
    cartSchema
);
