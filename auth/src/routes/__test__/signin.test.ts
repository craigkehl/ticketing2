import request from 'supertest';
import { app } from '../../app';

it('fails when an account email does not match', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'something@thething.com',
      password: '1234pass'
    })
    .expect(400);
});

it('returns a 400 on bad email or password entry', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tester@test.com',
      password: 'password1'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'tester@test.com',
      password: '12asdfasdfasdf3'
    })
    .expect(400);
});

it('returns a 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
});

it('sets a cookie on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});