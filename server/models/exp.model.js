import mongoose from 'mongoose';
const { Schema } = mongoose;

const expSchema = new Schema({
  difficulty: {
    type: String,
    required: true
  },
  correctPoints: {
    type: Number,
    required: true,
  },
  wrongPoints: {
    type: Number,
    required: true
  },
});

export default mongoose.model("Exp", expSchema)