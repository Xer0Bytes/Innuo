import mongoose from 'mongoose';
const { Schema } = mongoose;

const topicSchema = new Schema({
  topicID: {
    type: Number,
    required: true,
    unique: true,
  },
  topicTitle: {
    type: String,
    required: true,
  }
}, {
    timestamps: true
});

export default mongoose.model("Topic", topicSchema)