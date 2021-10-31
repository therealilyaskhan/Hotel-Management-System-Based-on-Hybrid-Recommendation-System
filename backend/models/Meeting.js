import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const meetingSchema = new Schema({
  venue: {
    type: String,
    required: [true, 'Please add a venue']
  },
  status: {
    type: String,
    required: [true, 'Please provide meeting status'],
    enum: ['Pending', 'Attended']
  },
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
  feedbackID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
    default: null
  },
  date: {
    type: Date,
    required: [true, 'Please select a date when you want to schedule the meeting']
  },
  course: {
    type: String,
    required: [true, 'Please add a course for the meeting'],
    trim: true,
    maxlength: [50, 'Course name can not be more than 50 characters']
  },
  slot: {
    type: String,
    required: [true, 'Please add a slot for meeting'],
    enum: ['Morning', 'Afternoon', 'Evening']
  }
}, { timestamps: true });

//by setting timestamps to true, any student document pushed into the mongoDB via the mongoose will implicitly add-onto the the document being inserted two extra fields: 1) createdAt 2) updatedAt fields; the createdAt is going to have the timestamp for when the document was inserted , and the updatedAt is going to have the timestamp for when the record was last updated in the database;

const Meeting = model('Meeting', meetingSchema);
export default Meeting;