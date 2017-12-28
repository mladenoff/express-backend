import mongoose from 'mongoose';

const Schema = mongoose.Schema();

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

export default mongoose.model('user', userSchema);
