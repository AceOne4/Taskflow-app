import Message from "@/models/messagesModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await dbConnect();
    const newMessage = await Message.create(body);
    return NextResponse.json(
      { message: "Message added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create Message" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const channel = new URL(req.url).searchParams.get("channel");

  await dbConnect();

  try {
    const messages = await Message.find({ channel });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
