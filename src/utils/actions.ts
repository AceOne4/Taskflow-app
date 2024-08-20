"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import {
  createUser,
  deleteProject,
  deleteTask,
  getUser,
  handleLoginStatus,
  newComment,
  newMessage,
  newProject,
  newTask,
} from "./sevice-data";
import bcrypt from "bcryptjs";
import { signupSchema } from "./zod";
import { IComment, IMessage, IProject, ITask } from "@/types/types";

import { pusherServer } from "./pusher";

export async function removeProject(id: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("User is not authenticated");
  }

  await deleteProject(id);
  revalidatePath("home/projects");
}

export async function removeTask(id: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("User is not authenticated");
  }

  await deleteTask(id);
}

export async function addProject(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated");
    }

    // Extract form data
    const members: string[] = [];
    const projectData = Object.fromEntries(formData.entries());

    // Handle Members extraction
    formData.forEach((value, key) => {
      if (key === "Members") {
        members.push(String(value));
      }
    });

    // Parse dates
    const startDate = new Date(String(projectData.startDate));
    const endDate = new Date(String(projectData.endDate));

    // Calculate months difference
    const monthsDifference =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();

    // Create project data object
    const project: IProject = {
      name: String(projectData.Name),
      description: String(projectData.Description || ""),
      status: String(projectData.Status),
      budget: Number(projectData.budget),
      startDate,
      duration: monthsDifference.toString(),
      manager: String(session.user.id),
      members: members,
      createdAt: new Date(),
      updatedAt: new Date(),
      color: String(projectData.color),
    };

    // Save project
    await newProject(project);
    revalidatePath("/home/projects");
    redirect("home/projects");
  } catch (error) {
    console.error("Error adding project:", error);
    // Handle error (e.g., show a notification to the user)
  }
}

export async function addTask(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated");
    }

    const {
      title,
      description,
      assignedTo,
      projectId,
      dueDate,
      priority,
      status,
      progress,
    } = Object.fromEntries(formData.entries());
    const task: ITask = {
      title: String(title),
      description: String(description),
      assignedTo: String(assignedTo),
      projectId: String(projectId),
      dueDate: new Date(String(dueDate)),
      priority: String(priority),
      status: String(status),
      progress: Number(progress),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(task);

    await newTask(task);
    revalidatePath("/home/tasks");
  } catch (error) {
    console.error("Error adding Task:", error);
  }
}

export async function loginAction(prev: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) return { error: "field is required" };

  await signIn("credentials", {
    email,
    password,
  });
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }
  await handleLoginStatus(session?.user?.id, true);

  redirect("/home/dashboard");
}

export async function signupAction(prev: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());

  const result = signupSchema.safeParse(formValues);
  if (!result.success) {
    return { error: result.error.errors.map((e) => e.message).join(", ") };
  }

  const { password, firstName, lastName, email, role } = result.data;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUser(email as string);

  if (existingUser.length > 0) {
    return { error: "User already exists" };
  }
  await createUser(
    `${firstName} ${lastName}` as string,
    email as string,
    undefined,
    role,
    hashPassword as string
  );
  redirect("/auth/singin");
}

export async function signOutAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }
  await handleLoginStatus(session?.user?.id, false);
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

export async function singInWithGoogleAction() {
  await signIn("google");
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }
  await handleLoginStatus(session?.user?.id, true);

  redirect("/home/dashboard");
}

export async function sendMessage(data: {
  message: string;
  sender: string;
  channel: string;
  reciver: string;
}) {
  try {
    const message: IMessage = {
      sender: data.sender,
      receiver: data.reciver,
      content: data.message,
      type: "text",
      channel: data.channel,
      isReaded: false,
      createdAt: new Date(),
    };

    await newMessage(message);
    // Trigger the event on the correct channel
    await pusherServer.trigger(data.channel, "upcoming-message", message);
  } catch (error) {
    console.error("Pusher trigger error:", error);
    throw new Error("An error occurred while sending the message");
  }
}

export async function sendTypingStatus(
  channel: string,
  userId: string,
  typing: boolean
) {
  try {
    await pusherServer.trigger(channel, "typing-status", { userId, typing });
  } catch (error) {
    console.error("Error sending typing status:", error);
  }
}

export async function sendComment(Comment: IComment) {
  try {
    await newComment(Comment);

    await pusherServer.trigger(Comment.taskId, "comments", Comment);
  } catch (error) {
    console.error("Pusher trigger error:", error);
    throw new Error("An error occurred while Comment the message");
  }
}
