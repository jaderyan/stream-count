const mongoose = require('mongoose');
const User = require('../models/user');

const DBs = require('../config');

const URL = DBs.DB.development;

const connectDb = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.info(`successfully connected to ${URL}`);
  } catch (error) {
    console.error(`connection failed - ${error}`);
  }
};

async function seeder() {
  await mongoose.connection.dropDatabase();

  const user = new User({ userId: 1, streams: 1 });
  await user.save();

  mongoose.disconnect();

  console.info('Database seeded 😀');
}

connectDb();
seeder();
