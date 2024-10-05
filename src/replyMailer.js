// src/replyMailer.js
const mailgun = require('mailgun-js');

const DOMAIN = 'qbapv.com'; // Asegúrate de usar tu dominio correcto
const mg = mailgun({ apiKey: 'cd125c06a84ac97d09880fa67aac5488-3724298e-6ad9fe8e', domain: DOMAIN });

const sendReply = (email, messageId, originalMessage) => {

  const data = {
    from: `No-Reply <no-reply@qbapv.com>`,  // Dirección que siempre usaremos
    to: 'knoglobal@gmail.com',  // Cambia este correo si deseas recibir en otro
    subject: `Referencia ID: ${messageId} - Correo del Usuario`,
    text: `Este es el correo del usuario: ${email}\n\nID del mensaje: ${messageId}\n\nMensaje Original:\n${originalMessage}`,
    html: `<p><strong>Correo del usuario:</strong> ${email}</p><p><strong>ID del mensaje:</strong> ${messageId}</p><p><strong>Mensaje Original:</strong></p><p>${originalMessage}</p>`
  };

  console.log(`Correo del usuario: ${email}, ID: ${messageId}, Mensaje: ${originalMessage}`);

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error enviando el correo con el ID y correo del usuario:', error);
    } else {
      console.log('Correo con ID y correo del usuario enviado:', body);
    }
  });
};

module.exports = sendReply;
