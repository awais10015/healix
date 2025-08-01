import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  meetingId: { type: String, required: true, unique: true },
  participants: [{ type: String }],
});

const Meeting = mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);
export default Meeting;
