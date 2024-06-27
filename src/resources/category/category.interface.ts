import { Document } from 'mongoose';

export default interface Category extends Document {
    title: string;
    type: string;
    description: string;
    image: string;
}