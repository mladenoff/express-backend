import { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

import WeighInSchema from './WeighInSchema';

const validateEmail = email => (
  (/\S+@\S+\.\S+/).test(email)
);

const UserSchema = new Schema({
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
  weighIns: [WeighInSchema],
});

UserSchema.pre('save', function callback(next) {
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

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(null, isMatch); }
    return callback(null, isMatch);
  });
};

UserSchema.statics.allUserWeighIns = function allUserWeighIns() {
  return this.find().then((users) => {
    const weighIns = [];
    users.forEach((user) => {
      weighIns.push(...user.weighIns);
    });
    return weighIns;
  });
};

// export default mongoose.model('User', UserSchema);
export default UserSchema;
