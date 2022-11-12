import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const transactionSchema = new Schema({
  meetingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting',
    required: [true, 'Please provide transaction ID']
  },
  tutorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: [true, 'Please provide transaction ID']
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Please provide transaction ID']
  },
  meetingDuration: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);
export default Transaction;