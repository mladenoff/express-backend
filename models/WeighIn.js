import mongoose, { Schema } from 'mongoose';

const weighInSchema = new Schema({
  weight: {
    type: Number,
  },
  unit: {
    type: String,
    default: 'lbs',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('weighIn', weighInSchema);
