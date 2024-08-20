import Task from "@/models/taskModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const taskId = new URL(req.url).searchParams.get("id");

    if (!taskId) {
      return NextResponse.json({ error: "invalid Id" }, { status: 400 });
    }

    const existingTask = await Task.findOne({ _id: taskId });

    if (!existingTask) {
      return NextResponse.json({ error: "task not found" }, { status: 404 });
    }

    return NextResponse.json(existingTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Task" },
      { status: 500 }
    );
  }
}
