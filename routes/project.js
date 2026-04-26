const express = require('express');
const router = express.Router();
const { Project } = require('../database/models');

const authenticateToken = require('../middleware/auth');

// GET all projects (protected)
router.get('/', authenticateToken, async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

// CREATE project (protected)
router.post('/', authenticateToken, async (req, res) => {
  const project = await Project.create({
    name: req.body.name,
    userId: req.user.id
  });

  res.status(201).json(project);
});

module.exports = router;