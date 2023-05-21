import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
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
  isContributer: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    default: "beginner",
  },
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema)