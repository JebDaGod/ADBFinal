ABD Final 

Render site: https://adbfinal.onrender.com

This project is a RESTful API built using Node.js, Express, Sequelize, and SQLite. It demonstrates full CRUD functionality, JWT authentication, role-based access control, and relational database design.

Features

- REST API built with Express
- SQLite database using Sequelize ORM
- JWT authentication (register and login)
- Role-based access control (user and admin roles)
- Password hashing with bcrypt
- CRUD operations for Users, Projects, and Tasks
- Relational database structure:
  - Users have many Projects
  - Projects have many Tasks
- Advanced endpoints for filtering, searching, and nested data access

Technologies Used

- Node.js
- Express.js
- Sequelize
- SQLite
- JWT (jsonwebtoken)
- bcrypt
- dotenv

Setup Instructions

1. Clone the repository
2. Install dependencies w/ npm install
3. Create .env file
4. Generate secure key with " node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" "
5. Initialize database with npm run setup
6. Seed database with npm run seed
7. Start server npm start
