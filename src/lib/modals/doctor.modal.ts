import mongoose, { Schema } from "mongoose";

const DoctorSchema = new Schema(
  {
    id: Number,
    image: String,
    name: String,
    designation: String,
  },
);

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
