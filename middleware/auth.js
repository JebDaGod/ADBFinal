const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // contains id + role
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = authenticate;