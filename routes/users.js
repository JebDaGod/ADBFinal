const express = require('express');
const { User } = require('../database/models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Admin only - get all users
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// User can see self, or Admin see all
router.get('/:id', authenticate, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.user.role !== 'admin' && req.user.id != req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json(user);
});

module.exports = router;