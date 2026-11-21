import { Resend } from 'resend';
import { env } from '../config/env.js';

const resend = new Resend(env.resendApiKey);

//manda un aviso que notifica que recibimos un mensaje

export async function sendContactEmail({name, email,subject,message}){
    const { error } = await resend.emails.send({
        from: 'Portafolio <onboarding@resend.dev>',
        to: env.contactEmail,

        replyTo: email,
        subject:`Nuevo mensaje del portafolio ${subject || `sin asunto`}`,
        text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    });

    if (error) {
        throw new Error (`Resend: ${error.message}`);
    }
}