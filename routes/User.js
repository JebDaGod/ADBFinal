const express = require('express');
const router = express.Router();
const { User } = require('../database/models');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// GET user by ID
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// POST create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await user.update(req.body);
  res.json(user);
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await user.destroy();
  res.status(204).send();
});

module.exports = router;