import mongoose from 'mongoose';
const { Schema } = mongoose;
import Choice from './choice.model.js';

const questionSchema = new Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true,
  },
  questionText: {
    type: String,
    required: false,
  },
  questionImageURL: {
    type: String,
    required: false,
  },
  choices: {
    type: [Choice.schema],
    default: undefined,
  },
  correctChoice: {
    type: Number,
    required: true,
  }
}, {
    timestamps: true
});

export default mongoose.model("Question", questionSchema)