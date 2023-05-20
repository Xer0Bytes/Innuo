import mongoose from 'mongoose';
const { Schema } = mongoose;
import Lesson from './lesson.model.js';

const moduleSchema = new Schema({
  moduleID: {
    type: Number,
    required: true,
    unique:true,
  },
  moduleTitle: {
    type: String,
    required: true,
  },
  lessons: {
    type: [Lesson.schema],
    default: undefined,
  },
  questions: {
    type: [Number],
    default: undefined,
  }
}, {
    timestamps: true
});

export default mongoose.model("Module", moduleSchema)