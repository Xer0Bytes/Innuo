import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema(
  {},
  {
    strict: false, 
    timestamps: true, 
  }
);

export default mongoose.model("Admin", adminSchema);
