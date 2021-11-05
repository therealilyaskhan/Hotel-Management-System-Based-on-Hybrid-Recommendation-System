import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const transactionSchema = new Schema({
  transactionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: [true, 'Please provide transaction ID']
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please provide transaction ID']
  }
}, { timestamps: true });

//by setting timestamps to true, any student document pushed into the mongoDB via the mongoose will implicitly add-onto the the document being inserted two extra fields: 1) createdAt 2) updatedAt fields; the createdAt is going to have the timestamp for when the document was inserted , and the updatedAt is going to have the timestamp for when the record was last updated in the database;

const Transaction = model('Transaction', transactionSchema);
export default Transaction;