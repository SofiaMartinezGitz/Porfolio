import app from './src/app.js'
import { env } from './src/config/env.js';
import { connectDB } from './src/config/db.js';

async function startServer() {
    try{
        await connectDB();
        app.listen(env.port, () => {
            console.log(`Servidor escuchando en http://localhost:${env.port}`)
        })
    } catch (error) {
        console.error('Error al iniciar el servidor');
        process.exit(1);
    }
}

startServer();