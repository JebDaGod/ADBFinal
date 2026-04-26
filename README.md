ABD Final 

Render site: https://adbfinal.onrender.com

This project is a RESTful API built using Node.js, Express, Sequelize, and SQLite. It demonstrates full CRUD functionality, JWT authentication, role-based access control, and relational database design.

Features

- REST API built with Express
- PostgreSQL database in prod
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
- PostgreSQL
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

Postman documentation in ADBFinalDocumen.json

This API is deployed on Render.
Environment variables required:
DATABASE_URL
JWT_SECRET
PORT

Notes:
PostgreSQL used in production
SQLite removed for deployment compatibility
JWT required for protected routes
Role-based access enforced via middleware
