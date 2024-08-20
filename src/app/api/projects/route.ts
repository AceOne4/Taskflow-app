import Project from "@/models/projectModel";
import Task from "@/models/taskModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const projects = await Project.find();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await dbConnect();
    const newProject = await Project.create(body);
    return NextResponse.json(
      { message: "Project added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create Project" },
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

    // Check if there are tasks related to this project and delete them
    await Task.deleteMany({ projectId: id });

    // Finding and deleting the project by ID
    const result = await Project.findByIdAndDelete(id);

    if (result) {
      return NextResponse.json(
        { message: "Project deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
