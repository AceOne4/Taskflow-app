import User from "@/models/userModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userId = new URL(req.url).searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "invalid Id" }, { status: 400 });
    }

    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
