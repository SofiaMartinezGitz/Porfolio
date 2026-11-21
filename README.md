# Portafolio de Sofía Martínez

Este es mi portafolio creativo hecho con React y Vite

Aquí muestro algunos de mis trabajos de ilustración, desarrollo web, edición de video y diseño

## Cómo abrir el proyecto

1. Descarga o clona este repositorio
2. Abre la carpeta en Visual Studio Code
3. Abre la terminal y escribe `npm install`
4. Después ejecuta `npm run dev`
5. Abre el enlace que aparece en la terminal

## Despliegue

### Frontend en Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Variable de entorno: `VITE_API_URL` con la URL base del servicio de Render (sin `/api/messages`).

### Backend en Render
- Crear un servicio Web Service usando la carpeta `server` como Root Directory.
- Build command: `npm install`
- Start command: `npm start`
- Configurar `MONGODB_URI`, `RESEND_API_KEY`, `CONTACT_EMAIL` y `ALLOWED_ORIGINS` en Environment.
- En `ALLOWED_ORIGINS`, escribir los dominios exactos separados por comas, por ejemplo `https://tu-sitio.netlify.app,http://localhost:5173`.

### Base de datos
La base de datos continúa en MongoDB Atlas. No se debe publicar el archivo `server/.env` ni subir credenciales al repositorio.
