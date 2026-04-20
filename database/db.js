const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Connection test
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Database connection error:', err);
  });

module.exports = sequelize;