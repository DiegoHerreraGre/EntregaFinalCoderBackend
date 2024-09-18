import mongoose from 'mongoose';
import envs from './envs.config.js';

export const connectMongoDB = async (): Promise<void> => {
    try {
        mongoose.connect(envs.MONGO_URL);
        console.log({ message: 'MongoDB connected' });
    } catch (error) {
        console.log({ message: `Error: ${error}` });
    }
};
