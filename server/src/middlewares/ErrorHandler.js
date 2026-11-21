// Maneja los errores que ocurren en las rutas y los controladores.
export function errorHandler(error, req, res, next) {
    console.error('Error en la API:', error.message);

    if (res.headersSent) {
        return next(error);
    }

    let statusCode = error.statusCode || error.status || 500;
    let message = error.message || 'Ocurrió un error inesperado.';

    // Error cuando llega un JSON mal escrito.
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        statusCode = 400;
        message = 'El contenido enviado no tiene un formato JSON válido.';
    }

    // Errores comunes de MongoDB / Mongoose.
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Los datos del mensaje no son válidos.';
    }

    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Uno de los datos enviados no tiene un formato válido.';
    }

    if (error.code === 11000) {
        statusCode = 409;
        message = 'Este registro ya existe.';
    }

    if (statusCode < 400 || statusCode > 599) {
        statusCode = 500;
    }

    res.status(statusCode).json({
        ok: false,
        message: statusCode === 500 ? 'Error interno del servidor. Inténtalo más tarde.' : message,
    });
}
