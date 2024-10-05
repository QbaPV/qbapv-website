// src/sendNoReplyEmail.js
const mailgun = require('mailgun-js');
const DOMAIN = 'qbapv.com';
const mg = mailgun({ apiKey: 'cd125c06a84ac97d09880fa67aac5488-3724298e-6ad9fe8e', domain: DOMAIN });

const sendNoReplyEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  const data = {
    from: 'no-reply@qbapv.com',
    to: email,
    subject: subject,
    text: `${message}\n\nPor favor, no responda a este correo.`,
    html: `<p>${message}</p><p><em>Por favor, no responda a este correo.</em></p>`
  };

  try {
    const emailResponse = await mg.messages().send(data);
    console.log('Correo unidireccional enviado:', emailResponse);

    res.status(200).json({ success: true, message: 'Correo enviado' });
  } catch (error) {
    console.error('Error enviando el correo unidireccional:', error);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
};

module.exports = sendNoReplyEmail;
