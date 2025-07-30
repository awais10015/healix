// models/meetingModel.ts
import mongoose from "mongoose";
// import { type } from "os";

const meetingSchema = new mongoose.Schema({
  meetingId: { type: String, required: true, unique: true },
  participants: [{ type: String }],
});

const Meeting = mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);
export default Meeting;
