import { Document } from 'mongoose';

export default interface Budget extends Document {
    user_id: string;
    title: string;
    amount: number;
    type: string;
    date: Date;
    category: string;
    description: string;
}
