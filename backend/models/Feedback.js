import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const feedbackSchema = new Schema({
  tutorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: [true, 'Please provide tutor ID']
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Please provide student ID']
  },
  meetingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
    default: null
  },
  review: {
    type: String,
    required: [true, 'Please add a review for this feedback'],
    trim: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating can not be more than 5']
  }
}, { timestamps: true });

//by setting timestamps to true, any student document pushed into the mongoDB via the mongoose will implicitly add-onto the the document being inserted two extra fields: 1) createdAt 2) updatedAt fields; the createdAt is going to have the timestamp for when the document was inserted , and the updatedAt is going to have the timestamp for when the record was last updated in the database;

const Feedback = model('Feedback', feedbackSchema);
export default Feedback;