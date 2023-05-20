import mongoose from 'mongoose';
import Module from './module.model.js';
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
  },
  modules: {
    type: [Module.schema],
    default: undefined,
  },
}, {
    timestamps: true
});

export default mongoose.model("Topic", topicSchema)