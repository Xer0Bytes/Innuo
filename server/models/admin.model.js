import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema(
  {},
  {
    strict: false,
  }
);

export default mongoose.model("Admin", adminSchema);
