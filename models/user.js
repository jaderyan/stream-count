const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  streams: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
