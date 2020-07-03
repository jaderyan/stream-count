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

describe('GET /streams/users/:id', () => {
  it('returns the user id and number of streams for a give user', () => request
    .get('/api/streams/users/1')
    .expect(200)
    .then((res) => expect(res.body.userId).to.equal(1)));

  it('returns a 404 if there is no user with that id', () => {
    request
      .get('/api/streams/users/2')
      .expect(404)
      .then((res) => expect(res.body.error).to.equal('User not found'));
  });
});
