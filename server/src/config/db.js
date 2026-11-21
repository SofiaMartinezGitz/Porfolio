import mongoose from "mongoose";
import { env } from './env.js';

//Esto lo que abre es la conexión con MongoDB Atlas

export async function connectDB() {
    await mongoose.connect(env.mongodbUri);
    console.log('Conectado a MongoDB')
}