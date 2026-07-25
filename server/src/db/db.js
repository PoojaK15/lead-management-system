const mongoose = require('mongoose');

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('database connected successfully');
  } catch (err) {
    console.log('database connection error', err);
  }
}

module.exports = connectDB;