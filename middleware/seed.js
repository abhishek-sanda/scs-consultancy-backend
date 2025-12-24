const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const seedAdmin = async () => {
  try {
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
      return;
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create new admin
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    });

    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();