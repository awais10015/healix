import { connect } from "@/lib/db";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, partnerId } = body;

    if (!userId || !partnerId) {
      return NextResponse.json({ error: "Missing user or partner ID" }, { status: 400 });
    }

    await connect();

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
