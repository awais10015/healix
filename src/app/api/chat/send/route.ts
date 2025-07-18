import { connect } from "@/lib/db";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { senderId, receiverId, message } = body;

    if (!senderId || !receiverId || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connect();
    const newMessage = await Message.create({ senderId, receiverId, message });

    return NextResponse.json(newMessage, { status: 200 });
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
