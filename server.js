// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sendEmail = require('./src/contactMailer'); // Esto debe ser una función
const sendReply = require('./src/replyMailer');   // Esto debe ser una función 
const storeEmail = require('./src/storeEmail');   // Esto debe ser una función 
const sendPersonalizedReply = require('./src/sendInfoEmail'); // Función para correos de seguimiento
const sendNoReplyEmail = require('./src/sendNoReplyEmail');   // Función para correos unidireccionales


const app = express();
app.use(bodyParser.json()); // Parsear los JSON enviados desde el frontend

// Configuración de CORS
const corsOptions = {
  origin: 'http://143.198.52.139:4000', // Cambia por la URL de tu frontend
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Mueve esta línea aquí después de inicializar cors

// Ruta para enviar correos desde el formulario de contacto
app.post('/send-email', sendEmail);

// Ruta para enviar correos personalizados (seguimiento)
app.post('/send-personalized-reply', sendPersonalizedReply);

// Ruta para enviar correos unidireccionales
app.post('/send-no-reply-email', sendNoReplyEmail);

// Ruta para almacenar el correo
app.post('/store-email', storeEmail);

// Ruta para enviar una respuesta
app.post('/send-reply', (req, res) => {
  sendReply(req, res);
});

// Puerto en el que el servidor estará escuchando
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
