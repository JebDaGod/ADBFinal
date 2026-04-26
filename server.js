const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

// ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/projects', require('./routes/project'));
app.use('/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});