import { connect } from "@/lib/db";
import User from "@/lib/modals/user.modal";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const users = await User.find().sort({ username: 1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
