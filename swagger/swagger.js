const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Website API',
    description: 'Website API'
  },
  host: 'https://webservicesw05-08.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['../routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

