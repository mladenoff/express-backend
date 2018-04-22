import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// const Schema = mongoose.Schema;
// replaced with object destructuring in `import`

const validateEmail = email => (
  (/\S+@\S+\.\S+/).test(email)
);

const userSchema = new Schema({
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
});

userSchema.pre('save', function callback(next) {
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

userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(null, isMatch); }
    return callback(null, isMatch);
  });
};

export default mongoose.model('user', userSchema);
