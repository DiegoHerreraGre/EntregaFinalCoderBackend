import mongoose from 'mongoose';
import envsConfig from './envs.config.js';

const { MONGO_URL } = envsConfig;

export const connectMongoDB = async () => {
    try {
        mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
