// /app/api/meeting/active/route.ts
import { NextResponse } from "next/server";
import Meeting from "@/models/meetingModel";
import {connect} from "@/lib/db";

export async function GET() {
  await connect();

  const activeMeeting = await Meeting.findOne().sort({ createdAt: -1 });
  if (!activeMeeting) {
    console.log("no active meeting")
    return NextResponse.json({ message: "No active meeting" }, { status: 404 });
  }

  return NextResponse.json(activeMeeting);
}
