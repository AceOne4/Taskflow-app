import Task from "@/models/taskModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const tasks = await Task.find();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await dbConnect();
    const newTask = await Task.create(body);
    return NextResponse.json(
      { message: "Task added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create Task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extracting the project ID from the request body
    const id = await req.json();

    // Connecting to the database
    await dbConnect();

    // Finding and deleting the project by ID
    const result = await Task.findByIdAndDelete(id);

    if (result) {
      return NextResponse.json(
        { message: "Task deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Task" },
      { status: 500 }
    );
  }
}
