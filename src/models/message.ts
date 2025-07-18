// models/Message.ts
import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    senderId: String,
    receiverId: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
