const express = require('express');
const { Project, Task } = require('../database/models');
const authenticate = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();





//CORE CRUD
// GET all projects (with optional search)
router.get('/', authenticate, async (req, res) => {
  const where = {};

  if (req.query.name) {
    where.name = {
      [Op.like]: `%${req.query.name}%`
    };
  }

  const projects = await Project.findAll({ where });
  res.json(projects);
});

// CREATE
router.post('/', authenticate, async (req, res) => {
  const project = await Project.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(project);
});

// UPDATE
router.put('/:id', authenticate, async (req, res) => {
  await Project.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Updated' });
});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
  await Project.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deleted' });
});



//ADVANCED ENDPOINTS
// GET all tasks for a project (nested route)
router.get('/:id/tasks', authenticate, async (req, res) => {
  const tasks = await Task.findAll({
    where: { projectId: req.params.id }
  });

  res.json(tasks);
});

// GET projects for a specific user (nested resource)
router.get('/user/:userId', authenticate, async (req, res) => {
  const projects = await Project.findAll({
    where: { userId: req.params.userId }
  });

  res.json(projects);
});

module.exports = router;