import mongoose from 'mongoose';
const { Schema } = mongoose;

const choiceSchema = new Schema({
  choiceText: {
    type: String,
    required: false,
  },
  choiceImageURL: {
    type: String,
    required: false,
  }
}, {
    timestamps: true
});

export default mongoose.model("Choice", choiceSchema)