import mongoose from 'mongoose';
const { Schema } = mongoose;

const verificationSchema = new Schema({
  userID: {
    type: String,
  },
  uniqueString: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiredAt: {
    type: Date,
  },
});

export default mongoose.model("Verification", verificationSchema)