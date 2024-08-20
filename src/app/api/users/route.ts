// pages/api/createUser.js
import User from "@/models/userModel";
import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body
    const { name, email, image, password } = body;

    await dbConnect();

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      profilePicture: image,
      password,
    });

    console.log(newUser);
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userEmail = new URL(req.url).searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: userEmail.toLowerCase() });

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

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const userId = new URL(req.url).searchParams.get("id");
    const { islogin } = await req.json();

    const user = await User.findByIdAndUpdate(
      userId,
      { islogin },
      { new: true }
    );
    NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
