// src/sendInfoEmail.js
const mailgun = require('mailgun-js');
const DOMAIN = 'qbapv.com';
const mg = mailgun({ apiKey: 'cd125c06a84ac97d09880fa67aac5488-3724298e-6ad9fe8e', domain: DOMAIN });

const sendPersonalizedReply = async (req, res) => {
  const { email, subject, message } = req.body;

  const data = {
    from: 'info@qbapv.com',
    to: email,
    subject: subject,
    text: message,
    html: `<p>${message}</p>`
  };

  try {
    const emailResponse = await mg.messages().send(data);
    console.log('Correo de seguimiento enviado:', emailResponse);

    res.status(200).json({ success: true, message: 'Correo enviado' });
  } catch (error) {
    console.error('Error enviando el correo de seguimiento:', error);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
};

module.exports = sendPersonalizedReply;
