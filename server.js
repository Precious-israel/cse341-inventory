require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/database'); 
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, z-key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});


// Routes
app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
});
process.on('uncaughtException', (err, origin) => {
  console.error('Caught exception:', err);
  console.error('Exception origin:', origin);
});

// Initialize DB and start server
mongodb.initDb((err, db) => {
  if (err) {
    console.error('Database initialization failed', err);
    process.exit(1); 
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log('Database connected successfully');
    });
  }
});


