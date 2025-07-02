// server.js - Configuración de Producción Optimizada
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
const sendEmail = require('./src/contactMailer');
const sendReply = require('./src/replyMailer');
const storeEmail = require('./src/storeEmail');
const sendPersonalizedReply = require('./src/sendInfoEmail');
const sendNoReplyEmail = require('./src/sendNoReplyEmail');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS optimizada para producción
const corsOptions = {
  origin: function(origin, callback) {
    // Permitir requests sin origin (como aplicaciones móviles)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://qbapv.com',
      'https://www.qbapv.com',
      'http://qbapv.com',
      'http://www.qbapv.com',
      // Para desarrollo local si es necesario
      'http://localhost:3000',
      'http://localhost:4000',
      'http://143.198.52.139:4000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  // API routes
  app.post('/api/send-email', sendEmail);
  app.post('/api/send-personalized-reply', sendPersonalizedReply);
  app.post('/api/send-no-reply-email', sendNoReplyEmail);
  app.post('/api/store-email', storeEmail);
  app.post('/api/send-reply', sendReply);
  
  // Catch all handler: send back React's index.html file for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
} else {
  // Rutas para desarrollo (sin /api prefix)
  app.post('/send-email', sendEmail);
  app.post('/send-personalized-reply', sendPersonalizedReply);
  app.post('/send-no-reply-email', sendNoReplyEmail);
  app.post('/store-email', storeEmail);
  app.post('/send-reply', sendReply);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Puerto configurado para producción
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📅 Iniciado: ${new Date().toLocaleString()}`);
});