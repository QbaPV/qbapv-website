// src/contactMailer.js
const mailgun = require('mailgun-js');
const sendReply = require('./replyMailer');

const DOMAIN = 'qbapv.com';
const mg = mailgun({ apiKey: 'cd125c06a84ac97d09880fa67aac5488-3724298e-6ad9fe8e', domain: DOMAIN });

const sendEmail = async (req, res) => {
  console.log('Datos completos recibidos en el backend:', req.body);  // Agregar este log para depurar

  const { id, name, email, phone, message } = req.body; // Asegúrate de extraer el número de teléfono y el correo

  console.log('Datos recibidos en el backend:', { id, name, email, phone, message });

  // Configurar los datos para el correo, incluyendo el teléfono y el email
  const data = {
    from: `No-Reply <no-reply@qbapv.com>`,
    to: 'knoglobal@gmail.com',
    subject: `Nuevo mensaje de ${name}`,
    text: `
      ID del mensaje: ${id}
      Nombre: ${name}
      Teléfono: ${phone}    // Añadir el teléfono aquí
      Correo: ${email}      // Añadir el correo conformado aquí
      Mensaje: ${message}
    `,
    html: `
      <strong>ID del mensaje:</strong> ${id} <br/>
      <strong>Nombre:</strong> ${name} <br/>
      <strong>Teléfono:</strong> ${phone} <br/>  <!-- Añadir el teléfono aquí -->
      <strong>Correo:</strong> ${email} <br/>    <!-- Añadir el correo conformado aquí -->
      <strong>Mensaje:</strong> ${message} <br/>
    `,
  };

  try {
    const emailResponse = await mg.messages().send(data);
    console.log('Correo enviado:', emailResponse);

    res.status(200).json({ success: true, messageId: id });

  } catch (error) {
    console.error('Error enviando el correo:', error);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
};

module.exports = sendEmail;

