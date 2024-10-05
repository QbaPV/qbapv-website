const mailgun = require('mailgun-js');

const DOMAIN = 'qbapv.com';  // Asegúrate de usar tu dominio correcto
const mg = mailgun({ apiKey: 'cd125c06a84ac97d09880fa67aac5488-3724298e-6ad9fe8e', domain: DOMAIN });

const data = {
  from: `No-Reply <no-reply@qbapv.com>`,  // Cambia el remitente a tu dominio
  to: 'picar74@yahoo.es',  // Cambia por el correo que quieras probar
  subject: 'Prueba de Mailgun desde consola',
  text: 'Este es un correo de prueba enviado desde Mailgun para verificar que funciona correctamente.',
};

mg.messages().send(data, (error, body) => {
  if (error) {
    console.error('Error enviando el correo:', error);
  } else {
    console.log('Correo enviado:', body);
  }
});
