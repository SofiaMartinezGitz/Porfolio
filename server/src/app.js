import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import messageRoutes from './routes/messageRoutes.js';
import { errorHandler } from './middlewares/ErrorHandler.js';
import { notFound } from './middlewares/notFound.js';

const app = express();

// CORS solo permite los dominios que estén en ALLOWED_ORIGINS.
app.use(cors({
    origin(origin, callback) {
        // Las herramientas de servidor (por ejemplo, health checks) no siempre envían Origin.
        if (!origin) return callback(null, true);

        if (env.allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        const error = new Error('Este origen no tiene permiso para acceder a la API.');
        error.statusCode = 403;
        return callback(error);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API funcionando correctamente' });
});

app.use('/api/messages', messageRoutes);

// Estas dos funciones deben ir después de todas las rutas.
app.use(notFound);
app.use(errorHandler);

export default app;
