const express = require('express');
const router = express.Router();
const { Task } = require('../database/models');

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
});

// GET task by ID
router.get('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// POST create task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      completed: req.body.completed,
      projectId: req.body.projectId
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.update(req.body);
  res.json(task);
});

// DELETE task
router.delete('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.destroy();
  res.status(204).send();
});

module.exports = router;