const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://MarionLB:B1gjBYL8qdipSX9f@cluster0.j4uxon5.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
