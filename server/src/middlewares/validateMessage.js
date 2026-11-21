// Validación sencilla de los datos que llegan desde el formulario.
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LIMITS = {
    name: 100,
    email: 254,
    subject: 150,
    message: 5000,
};

export function validateMessage(req, res, next) {
    const { name, email, subject = '', message, website } = req.body || {};

    // Campo trampa para bots. Se responde como si todo hubiera salido bien.
    if (website) {
        return res.status(201).json({ ok: true, message: 'Mensaje recibido' });
    }

    const errors = {};
    const fields = { name, email, subject, message };

    for (const [field, value] of Object.entries(fields)) {
        const required = field !== 'subject';

        if (value === undefined || value === null) {
            if (required) errors[field] = 'Este campo es obligatorio.';
            continue;
        }

        if (typeof value !== 'string') {
            errors[field] = 'Este campo debe ser un texto.';
            continue;
        }

        if (required && value.trim() === '') {
            errors[field] = 'Este campo es obligatorio.';
            continue;
        }

        if (value.length > LIMITS[field]) {
            errors[field] = `Este campo no puede superar los ${LIMITS[field]} caracteres.`;
        }
    }

    if (!errors.email && !EMAIL_REGEX.test(email.trim())) {
        errors.email = 'El correo electrónico no es válido.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            ok: false,
            message: 'Revisa los datos del formulario.',
            errors,
        });
    }

    // Dejamos los datos limpios para el controlador.
    req.body = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
    };

    next();
}
