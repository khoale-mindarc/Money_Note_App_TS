import { Schema, model } from 'mongoose';
import Category from '@/resources/category/category.interface';

const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLenght: 50,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            require: false,
            trim: true,
            maxLenght: 100,
        },
        image: {
            type: String,
            required: false,
            trim: true
        }
    },
    {
        timestamps: true,
    },
);

export default model<Category>('Category', CategorySchema);
