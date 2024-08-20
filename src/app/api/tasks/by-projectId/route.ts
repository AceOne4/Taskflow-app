import Task from "@/models/taskModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const PId = new URL(req.url).searchParams.get("id");

    const tasks = await Task.find({ projectId: PId });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Tasks" },
      { status: 500 }
    );
  }
}
