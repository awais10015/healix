import { NextResponse } from "next/server";
import Meeting from "@/models/meetingModel";
import {connect} from "@/lib/db";

export async function POST(req: Request) {
  await connect();
  const { meetingId } = await req.json();

  try {
    await Meeting.deleteOne({ meetingId });
    return NextResponse.json({ message: "Meeting deleted" });
  } catch{
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
