
import { NextResponse } from "next/server";
import Meeting from "@/models/meetingModel";
import {connect} from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  await connect();
  const body = await req.json();
  const { meetingId, participants } = body;

await pusherServer.trigger("chat-app", "meeting-created", {
  message: "Doctor started a meeting with you",
});


  try {
    const meeting = await Meeting.create({ meetingId , participants});
    return NextResponse.json(meeting, { status: 201 });
  } catch{
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
