require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const User = require('./src/models/user');

async function bootstrap() {
  await connectDB();

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  let existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    existingAdmin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log('Default admin user created');
  } else if (existingAdmin.role !== 'admin') {
    existingAdmin.role = 'admin';
    await existingAdmin.save();
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`server running successfully on port ${PORT}`);
  });
}

bootstrap();