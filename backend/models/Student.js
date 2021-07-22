import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const model = mongoose.model;

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please add first name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add last name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add email address'],
    unique: true,
    match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'please Enter a valid email address']
  },
  address: {
    type: String,
    required: [true, 'Please enter an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    city: String,
    region: String,
    zipcode: String,
    country: String
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Please enter password'],
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  zipcode: {
    type: String,
    required: [true, 'Please enter your zip code']
  },
  isTutor: {
    type: Boolean,
    default: false,
    required: true
  }
}, { timestamps: true });

//by setting timestamps to true, any student document pushed into the mongoDB via the mongoose will implicitly add-onto the the document being inserted two extra fields: 1) createdAt 2) updatedAt fields; the createdAt is going to have the timestamp for when the document was inserted , and the updatedAt is going to have the timestamp for when the record was last updated in the database;

// adding instance method to the instances of the Student Model:
// Sign JWT and return
studentSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match student entered password to hashed password in database
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
studentSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


//translating the zip code into GeoJSON location object:
studentSchema.pre('save', async function (next) {
  //not using arrow => due to *this* binding prob
  const where = encodeURIComponent(JSON.stringify({
    "postalCode": this.zipcode
  }));
  const response = await fetch(
    `https://parseapi.back4app.com/classes/Pakistanzipcode_pakistan_zip_code_database?where=${where}`,
    {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': 'tB4AASFt7dbCpKb1vZLB3NznqV8VRm8rljlBAtdS',
        'X-Parse-REST-API-Key': 'SlDPos11mPY8Y69biFdgPIkK6d4OpKCxPKJGypiG',
      }
    }
  );

  const data = await response.json();
  const loc = data.results;

  this.location = {
    type: 'Point',
    coordinates: [loc[0].geoPosition.longitude, loc[0].geoPosition.latitude],
    city: loc[0].placeName,
    region: loc[0].adminName1,
    zipcode: loc[0].postalCode,
    country: loc[0].countryCode
  };

  //now discard address and zipcode now from getting into DB
  this.zipcode = undefined;
  next();
});

const Student = model('Student', studentSchema);
export default Student;