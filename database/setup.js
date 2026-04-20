const sequelize = require('./db');
require('./models'); // loads relationships

const setup = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Connected to database');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

setup();