const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test'
    ? ':memory:'              // TEST DATABASE 
    : './database.sqlite',   // NORMAL DATABASE
  logging: false
});

// Connection test
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Database connection error:', err);
  });

module.exports = sequelize;