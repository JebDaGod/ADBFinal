const express = require('express');
const router = express.Router();
const { Project } = require('../database/models');

// GET all projects
router.get('/', async (req, res) => {
  const projects = await Project.findAll();
  res.status(200).json(projects);
});

// GET project by ID
router.get('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

// POST create project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      userId: req.body.userId
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  await project.update(req.body);
  res.json(project);
});

// DELETE project
router.delete('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  await project.destroy();
  res.status(204).send();
});

module.exports = router;