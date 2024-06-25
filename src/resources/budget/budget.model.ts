import { Schema, model } from 'mongoose';
import Budget from '@/resources/budget/budget.interface';

const BudgetSchema = new Schema(
    {
        user_id: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLenght: 50,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
            maxLenght: 20,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            require: true,
            trim: true,
        },
        category: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            require: false,
            trim: true,
            maxLenght: 100,
        },
    },
    {
        timestamps: true,
    },
);

export default model<Budget>('Budget', BudgetSchema);
