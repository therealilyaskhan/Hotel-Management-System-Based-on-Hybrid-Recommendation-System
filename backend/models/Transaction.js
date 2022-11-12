import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const transactionSchema = new Schema({
  meetingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting',
    required: [true, 'Please provide transaction ID']
  },
  hotelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
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