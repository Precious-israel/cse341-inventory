require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/database');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, z-key'
  );
  res.setHeader('Access-Control-Allow-Mthods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log("Database is listening and node running.")
    })
  }
});




// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// const { connectDB } = require('./config/database');
// connectDB();

// // Routes
// app.use('/api', require('./routes'));

// // Swagger Documentation
// app.use('/api-docs', require('./routes/swagger'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     success: false, 
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'production' ? {} : err.message 
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
// });

// module.exports = app;