import { Message } from '../models/Message.js';
import { sendContactEmail } from '../services/mailService.js';

// Recibe el formulario, guarda el mensaje y avisa por correo.
export async function createMessage(req, res, next) {
    try {
        const { name, email, subject, message } = req.body;

        // Mongoose recibe un objeto con los campos del documento.
        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
        });

        // Si el correo falla, el mensaje ya queda guardado en MongoDB.
        // No devolvemos un error al visitante por un problema del servicio de correo.
        try {
            await sendContactEmail({ name, email, subject, message });
        } catch (mailError) {
            console.error('El mensaje se guardó, pero no se pudo enviar el correo:', mailError.message);
        }

        return res.status(201).json({
            ok: true,
            message: '¡Tu mensaje fue recibido correctamente!',
            id: newMessage._id,
        });
    } catch (error) {
        next(error);
    }
}
