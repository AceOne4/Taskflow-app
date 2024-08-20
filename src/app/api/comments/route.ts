import Comment from "@/models/commentsModal";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await dbConnect();
    const newComment = await Comment.create(body);
    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create Comment" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const channel = new URL(req.url).searchParams.get("channel");

  await dbConnect();

  try {
    const comments = await Comment.find({ taskId: channel });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
