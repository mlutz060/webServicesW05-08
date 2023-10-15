const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gym API',
    description: 'Gym API'
  },
  host: 'webservicesw05-08.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['../routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

