// /app/api/meeting/create/route.ts
import { NextResponse } from "next/server";
import Meeting from "@/models/meetingModel";
import {connect} from "@/lib/db"; // helper to connect to MongoDB

export async function POST(req: Request) {
  await connect();
  const body = await req.json();
  const { meetingId, participants } = body;

  try {
    const meeting = await Meeting.create({ meetingId , participants});
    return NextResponse.json(meeting, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
