process.env.NODE_ENV = 'test';

const app = require('../server');
const User = require('../models/user');
const { expect } = require('chai');
const request = require('supertest')(app);
const mongoose = require('mongoose');

beforeEach(async () => {
  await mongoose.connection.dropDatabase();

  const user = new User({ userId: 1, streams: 1 });
  await user.save();
});

after(() => {
  mongoose.disconnect();
});

describe('GET /api/streams/users/:userId', () => {
  it('returns the user id and number of streams for a give user', async () => {
    const res = await request
      .get('/api/streams/users/1')
      .expect(200);

    expect(res.body.userId).to.equal(1);
  });

  it('returns a 404 if there is no user with that id', async () => {
    const res = await request
      .get('/api/streams/users/2')
      .expect(404);

    expect(res.body.error).to.equal('User not found');
  });
});

describe('POST /api/streams/users/:userId/start', () => {
  it('increases the stream count for a given user', async () => {
    const res = await request.post('/api/streams/users/1/start').expect(200);

    expect(res.body.streams).to.equal(2);
  });

  it('if the given user does not exsist, adds them to the database and increases the stream count', async () => {
    const res = await request.post('/api/streams/users/2/start').expect(201);

    expect(res.body.streams).to.equal(1);
  });

  it('if the given user already has 3 streams, will return an error message and not increase the count', async () => {
    await request.post('/api/streams/users/2/start').expect(201);
    await request.post('/api/streams/users/2/start').expect(200);
    await request.post('/api/streams/users/2/start').expect(200);

    const res = await request.post('/api/streams/users/2/start').expect(403);

    expect(res.body.error).to.equal('Maximum number of streams reached');
  });
});
