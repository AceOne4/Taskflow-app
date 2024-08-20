import User from "@/models/userModel"; // Adjust the import path as necessary
import Project from "@/models/projectModel";
import Task from "@/models/taskModel";
import dbConnect from "./mongodb";
import bcrypt from "bcryptjs";

const password1 = "AD@58616856";
const password2 = "AD@58616878";
const password3 = "AD@58616889";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

// Function to create users, project, and tasks
export const createData = async () => {
  try {
    await dbConnect();
    // Create Users
    const user1 = new User({
      name: "Alice Johnson",
      email: "alice@example.com",
      password: await hashPassword(password1), // Replace with actual hashed password
      role: "Developer",
      profilePicture: "/profiles/alice.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user2 = new User({
      name: "Bob Smith",
      email: "bob@example.com",
      password: await hashPassword(password2), // Replace with actual hashed password
      role: "Project Manager",
      profilePicture: "/profiles/bob.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user3 = new User({
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: await hashPassword(password3), // Replace with actual hashed password
      role: "Tester",
      profilePicture: "/profiles/charlie.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await user1.save();
    await user2.save();
    await user3.save();

    // Create Project
    const newGizaProject = new Project({
      name: "NewGiza",
      description: "A project to build the NewGiza community.",
      status: "In Progress",
      manager: user2._id,
      duration: "1 year",
      budget: 500000,
      startDate: new Date("2024-01-01"),
      members: [user1._id, user2._id, user3._id],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newGizaProject.save();

    // Create Tasks
    const task1 = new Task({
      projectId: newGizaProject._id,
      title: "Design Phase",
      description: "Complete the design phase of the NewGiza project.",
      assignedTo: user1._id,
      dueDate: new Date("2024-03-01"),
      priority: "High",
      status: "In Progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const task2 = new Task({
      projectId: newGizaProject._id,
      title: "Development Phase",
      description: "Complete the development phase of the NewGiza project.",
      assignedTo: user1._id,
      dueDate: new Date("2024-06-01"),
      priority: "Medium",
      status: "Not Started",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const task3 = new Task({
      projectId: newGizaProject._id,
      title: "Testing Phase",
      description: "Complete the testing phase of the NewGiza project.",
      assignedTo: user3._id,
      dueDate: new Date("2024-09-01"),
      priority: "Low",
      status: "Not Started",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await task1.save();
    await task2.save();
    await task3.save();

    console.log("Users, project, and tasks created successfully.");
  } catch (error) {
    console.error("Error creating data:", error);
  }
};
