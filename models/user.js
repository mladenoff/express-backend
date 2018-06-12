import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// import WeighIn from './WeighIn';
// const Schema = mongoose.Schema;
// replaced with object destructuring in `import`

const validateEmail = email => (
  (/\S+@\S+\.\S+/).test(email)
);

const WeighIn = new Schema({
  weight: {
    type: Number,
  },
  unit: {
    type: String,
    default: 'lb',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
  },
  weighIns: [WeighIn],
});

User.pre('save', function callback(next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        return next();
      });
    });
  } else {
    next();
  }
});

User.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(null, isMatch); }
    return callback(null, isMatch);
  });
};

User.statics.allUserWeighIns = function allUserWeighIns() {
  return this.find().then((users) => {
    const weighIns = [];
    users.forEach((user) => {
      weighIns.push(...user.weighIns);
    });
    return weighIns;
  });
};

export default mongoose.model('User', User);
