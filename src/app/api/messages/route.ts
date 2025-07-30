import { connect } from "@/lib/db";
import Chat from "@/models/Chat";
import { pusherServer } from "@/lib/pusher";

import Message from "@/models/Message";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const { senderId, receiverId, text, chatId } = body;

    console.log(body);

    if (!senderId || !receiverId || !text) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
    } else {
      chat = await Chat.findOne({
        participants: { $all: [senderId, receiverId], $size: 2 },
      });

      if (!chat) {
        chat = await Chat.create({ participants: [senderId, receiverId] });
      }
    }

    const message = await Message.create({
      senderId,
      receiverId,
      chatId: chat._id,
      text,
    });

    chat.messages = [...chat.messages, message._id];
    await chat.save();

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("error", { status: 400 });
  }
}

export async function GET() {
  await connect();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}
