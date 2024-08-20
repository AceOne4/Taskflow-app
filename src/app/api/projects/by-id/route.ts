import Project from "@/models/projectModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const projectId = new URL(req.url).searchParams.get("id");

    if (!projectId) {
      return NextResponse.json({ error: "invalid Id" }, { status: 400 });
    }

    const existingProject = await Project.findOne({ _id: projectId });

    if (!existingProject) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(existingProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
