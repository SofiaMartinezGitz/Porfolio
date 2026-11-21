// Responde cuando alguien intenta acceder a una ruta que no existe.
export function notFound(req, res, next) {
    const error = new Error(`No existe la ruta ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}
