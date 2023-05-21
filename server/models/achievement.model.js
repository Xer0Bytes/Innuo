import mongoose from 'mongoose';
const { Schema } = mongoose;

const achievementSchema = new Schema({
  achieveID: {
    type: Number,
    required: true,
    unique: true,
  },
  achieveTitle: {
    type: String,
    required: true,
  },
  achieveDesc: {
    type: String,
    required: false,
  },
  achieveimageURL: {
    type: String,
    default: false,
  },
  achieveCondition: {
    type: Number,
    default: 0,
  },
}, {
    timestamps: true
});

export default mongoose.model("Achievement", achievementSchema)