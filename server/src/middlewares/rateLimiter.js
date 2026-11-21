import { rateLimit } from 'express-rate-limit';

// Evita que el formulario reciba demasiados envíos en poco tiempo.
export const messageRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        ok: false,
        message: 'Has enviado varios mensajes. Espera unos minutos e inténtalo de nuevo.',
    },
});
