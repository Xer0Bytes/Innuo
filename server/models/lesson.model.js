import mongoose from 'mongoose';
const { Schema } = mongoose;

const lessonSchema = new Schema({
  lessonID: {
    type: Number,
    required: true,
    unique: true,
  },
  lessonText: {
    type: String,
    required: true,
  },
  lessonImageURL: {
    type: String,
    required: true,
  }
}, {
    timestamps: true
});

export default mongoose.model("Lesson", lessonSchema)