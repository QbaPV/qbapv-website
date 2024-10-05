// src/storeEmail.js
const emails = {};  // Almacenamos temporalmente en memoria (idealmente, deberías usar una base de datos)

const storeEmail = (req, res) => {
  const { id, email } = req.body;
  emails[id] = email;
  res.status(200).json({ success: true, message: "Email stored successfully." });
};

module.exports = storeEmail;
