import mongoose from 'mongoose';
const { Schema } = mongoose;

const moduleSchema = new Schema({
  moduleID: {
    type: Number,
    required: true,
  },
  moduleTitle: {
    type: String,
    required: true,
  },
}, {
    timestamps: true
});

export default mongoose.model("Module", moduleSchema)