import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verifiedEmail: {
    type: Boolean,
    default: false
  },
  experiencePoints: {
    type: Number,
    default: 0
  },
  pfpLink: {
    type: String,
    required: false
  },
  achieved: {
    type: [Number],
    default: undefined
  },
  modulesCompleted: {
    type: [Number],
    default: undefined
  },
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema)