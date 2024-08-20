import User from "@/models/userModel";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const tasks = await User.find();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
