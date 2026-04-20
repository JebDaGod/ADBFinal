const request = require('supertest');
const app = require('../server');
const { User } = require('../database/models');

describe('Users API', () => {

  beforeAll(async () => {
    await User.sync({ force: true });
  });

  // CREATE (success)
  test('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@test.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('test@test.com');
  });

  // CREATE (error)
  test('should fail if email is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'No Email' });

    expect(res.statusCode).toBe(400);
  });

  // GET all
  test('should get all users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});