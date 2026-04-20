const request = require('supertest');
const app = require('../server');
const { Project } = require('../database/models');

describe('Projects API', () => {

  beforeAll(async () => {
    await Project.sync({ force: true });
  });

  test('should create a project', async () => {
    const res = await request(app)
      .post('/projects')
      .send({ name: 'Test Project', userId: 1 });

    expect(res.statusCode).toBe(201);
  });

  test('should fail without name', async () => {
    const res = await request(app)
      .post('/projects')
      .send({ userId: 1 });

    expect(res.statusCode).toBe(400);
  });

});