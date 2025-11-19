const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Inventory Management System API',
        description: 'This is an API for Inventory Management System'
    },
    host: 'localhost:3000', 
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
