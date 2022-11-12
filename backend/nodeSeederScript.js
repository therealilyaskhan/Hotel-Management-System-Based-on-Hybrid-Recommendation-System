//this is a node script which when run will cause the following script code to run in node environment and insert bulk data into our DB
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
const __dirname = path.resolve();

// Load env vars
dotenv.config({ path: './config/.env' });

// Load models
import Tutor from './models/Tutor.js';
import Customer from './models/Customer.js';

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mik:xenderoo7@clustertutorperhour.5nvdg.mongodb.net/tutorPerHour?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const tutors = JSON.parse(
  fs.readFileSync(__dirname + '/_jsonData/tutors.json', 'utf-8')
);

const customers = JSON.parse(
  fs.readFileSync(__dirname + '/_jsonData/customers.json', 'utf-8')
);

// Insert into DB
const insertData = async () => {
  try {
    await Tutor.create(tutors);
    await Customer.create(customers);
    console.log('Data inserted...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Tutor.deleteMany();
    await Customer.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
