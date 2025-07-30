import { connect } from "@/lib/db";
import Report from "@/models/Reports";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connect();
  const body = await req.json();
  const report = await Report.create(body);
  return NextResponse.json(report);
}

export async function GET() {
  await connect();
  const reports = await Report.find().sort({ createdAt: -1 });
  return NextResponse.json(reports);
}
