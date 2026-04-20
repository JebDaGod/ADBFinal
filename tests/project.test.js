const request = require('supertest');
const app = require('../server');
const { Project, User } = require('../database/models');

describe('Projects API', () => {

  beforeAll(async () => {
    await Project.sync({ force: true });
    await User.sync({ force: true });
  });

  test('should create a project', async () => {
    // CREATE USER FIRST (required for FK)
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'user@test.com' });

    const userId = userRes.body.id;

    // CREATE PROJECT
    const res = await request(app)
      .post('/projects')
      .send({
        name: 'Test Project',
        userId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Project');
  });

  test('should fail without name', async () => {
    const res = await request(app)
      .post('/projects')
      .send({ userId: 1 });

    expect(res.statusCode).toBe(400);
  });

});