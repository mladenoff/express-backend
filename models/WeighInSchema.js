import { Schema } from 'mongoose';

const WeighInSchema = new Schema({
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

export default WeighInSchema;
