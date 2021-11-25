import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';

const Schema = mongoose.Schema;
const model = mongoose.model;

const meetingSchema = new Schema({
  venue: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number], //array of nums where longitude comes first then latitude
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
  },
  latitude: {
    type: Number,
    required: [true, 'Please provide latitude point for the tutor location']
  },
  longitude: {
    type: Number,
    required: [true, 'Please provide longitude point for the tutor location']
  },
  status: {
    type: String,
    required: [true, 'Please provide meeting status'],
    enum: ['pending', 'attended'],
    default: "pending"
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
  startDate: {
    type: String,
    trim: true,
    required: [true, 'Please select a date when you want to schedule the meeting']
  },
  endDate: {
    type: String,
    trim: true,
    required: [true, 'Please select a date when you want to schedule the meeting']
  }
}, { timestamps: true });

//before feeding the data into the collection we will convert the  latitude and longitude point submitted by the student into an address and zip code etc:
meetingSchema.pre('save', async function (next) {
  const loc = await geocoder.reverse({ lat: this.latitude, lon: this.longitude });

  this.venue = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    country: loc[0].countryCode,
    zipcode: loc[0].zipcode
  };

  //do not save longitude and latitude points in DB
  this.latitude = undefined;
  this.longitude = undefined;
  next();
});


const Meeting = model('Meeting', meetingSchema);
export default Meeting;