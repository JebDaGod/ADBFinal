const express = require('express');
const { Task, Project } = require('../database/models');
const authenticate = require('../middleware/auth');
const ownership = require('../middleware/ownership');

const router = express.Router();

// GET tasks only for user's projects
router.get('/', authenticate, async (req, res) => {
  const tasks = await Task.findAll({
    include: Project
  });

  const filtered = tasks.filter(t =>
    req.user.role === 'admin' || t.Project.userId === req.user.id
  );

  res.json(filtered);
});

// CREATE task (must belong to user's project)
router.post('/', authenticate, async (req, res) => {
  const project = await Project.findByPk(req.body.projectId);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  if (req.user.role !== 'admin' && project.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not your project' });
  }

  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// UPDATE/DELETE with ownership via project check
router.put('/:id', authenticate, async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) return res.status(404).json({ error: 'Not found' });

  const project = await Project.findByPk(task.projectId);

  if (req.user.role !== 'admin' && project.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await task.update(req.body);
  res.json(task);
});

module.exports = router;