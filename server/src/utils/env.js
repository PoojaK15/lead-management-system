const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`Missing env var: ${key}`);
  }
}

module.exports = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
