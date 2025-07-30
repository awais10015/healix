import { connect } from "@/lib/db";
import Chat from "../../../models/Chat";
// import Message from "@/models/Message";
import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

export async function POST(req) {
  await connect();
  const body = await req.json();
  const { participants } = body;

  if (!participants || participants.length !== 2) {
    return NextResponse.json(
      { error: "Participants must be an array of two user IDs." },
      { status: 400 }
    );
  }

  // Check if chat already exists between these participants (regardless of order)
  const existingChat = await Chat.findOne({
    participants: { $all: participants, $size: 2 },
  }).populate("messages");

  if (existingChat) {
    return NextResponse.json(existingChat);
  }

  // If not found, create new chat
  const newChat = await Chat.create({ participants });
  const populatedChat = await Chat.findById(newChat._id).populate("messages");
  return NextResponse.json(populatedChat);
}
export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");

  if (user1 && user2) {
    const chat = await Chat.findOne({
      participants: { $all: participants, $size: 2 },
    }).populate("messages");

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat);
  }

  // Default: return all chats (admin use-case?)
  const chats = await Chat.find().sort({ createdAt: -1 }).populate("messages");
  return NextResponse.json(chats);
}
