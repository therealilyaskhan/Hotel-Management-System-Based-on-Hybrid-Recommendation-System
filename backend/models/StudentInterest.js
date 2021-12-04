import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const studentInterestSchema = new Schema({
  interests: {
    type: Array,
    required: true
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    unique: true,
    required: [true, 'Please provide student ID']
  }
}, { timestamps: false });

const StudentInterest = model('StudentInterest', studentInterestSchema);
export default StudentInterest;