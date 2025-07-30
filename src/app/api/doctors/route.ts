// app/api/doctors/route.ts
import { connect } from "@/lib/db";
import Doctor from "@/lib/modals/doctor.modal";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const doctors = await Doctor.find().sort({ id: 1 });

    return NextResponse.json(doctors);
  } catch {
    console.log(error);
  }
}
