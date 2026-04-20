const request = require('supertest');
const app = require('../server');
const { Task } = require('../database/models');

describe('Tasks API', () => {

  beforeAll(async () => {
    await Task.sync({ force: true });
  });

  test('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        completed: false,
        projectId: 1
      });

    expect(res.statusCode).toBe(201);
  });

  test('should fail without title', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ projectId: 1 });

    expect(res.statusCode).toBe(400);
  });

});