/* 
When you have 'type: module' in the package.json file, your source code should use import syntax. When you do not have, you should use require syntax. you can't mix up both require and import calls while importing modules, that will give an error;
*/
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';

import connectDB from './db.js';
import studentsRouter from './routes/students.js';
import meetingsRouter from './routes/meetings.js';
import tutorsRouter from './routes/tutors.js';
import errorHandler from './middleware/errorHandler.js';
import feedbacksRouter from './routes/feedbacks.js';

dotenv.config({ path: './config/.env' });

//connect to cluster
connectDB();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

//req body parser: express.json() returns an express's native middleware function that accepts as argument 'req' , 'res' and 'next' objects, the http req object that it accepts, it parses the body of that and attaches it a body property which is also an object, previously when express did have this middleware natively we had to use body parser middleware function from npm;
app.use(express.json());

// fileupload middlware
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//default route
app.get('/', function (req, res) {
  res.send("Default Page");
});

// the "students" api coming from the "routes" folder
app.use('/api/students', studentsRouter);

// the "tutors" api coming from the "routes" folder
app.use('/api/tutors', tutorsRouter);

// MEETINGS
app.use('/api/meetings', meetingsRouter);

//Feedbacks
app.use('/api/feedbacks', feedbacksRouter);

//errorHandler middleware at the end of all routings ? read at "NodeJS Fundamentals" search "error handler middleware"
app.use(errorHandler);


app.listen(port, () => console.log(`server at https://localhost:${port}`));