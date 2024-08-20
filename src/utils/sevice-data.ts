import { IComment, IMessage, IProject, ITask } from "@/types/types";

const BASE_URL = "http://localhost:3000/api";

// Helper function to make fetch requests
const fetchData = async (endpoint: string, options: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data");
  }
};

// User-related functions
export const getUser = async (userEmail: string) => {
  return fetchData(`/users?email=${encodeURIComponent(userEmail)}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};

export const getUserById = async (id: string) => {
  return fetchData(`/users/by-id?id=${id}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};

export const getAllUsers = async () => {
  return fetchData("/users/all-users", {
    next: { revalidate: 20 },
  });
};

export const createUser = async (
  name: string,
  email: string,
  image: string = "/avi.svg",
  role: string = "Developer",
  password?: string
) => {
  return fetchData("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, image, role }),
    next: { revalidate: 300 },
  });
};

export const handleLoginStatus = async (
  userId: string,
  onlineStatus: boolean
) => {
  return fetchData(`/users?id=${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isOnline: onlineStatus }),
  });
};

// Project-related functions
export const getAllProjects = async () => {
  return fetchData("/projects", {
    next: { revalidate: 1600 },
  });
};

export const getProjectById = async (id: string) => {
  return fetchData(`/projects/by-id?id=${id}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};

export const newProject = async (projectData: IProject) => {
  return fetchData("/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
    next: { revalidate: 20 },
  });
};

export const deleteProject = async (id: string) => {
  return fetchData("/projects", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
    next: { revalidate: 20 },
  });
};

// Task-related functions
export const getAllTasks = async () => {
  return fetchData("/tasks", {
    next: { revalidate: 20 },
  });
};

export const gettasksbyProjectId = async (id: string) => {
  return fetchData(`/tasks/by-projectId?id=${id}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};

export const getTaskById = async (id: string) => {
  return fetchData(`/tasks/by-id?id=${id}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};

export const newTask = async (taskData: ITask) => {
  return fetchData("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
    next: { revalidate: 20 },
  });
};

export const deleteTask = async (id: string) => {
  return fetchData("/tasks", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
    next: { revalidate: 20 },
  });
};

// Message-related functions
export const newMessage = async (messageData: IMessage) => {
  return fetchData("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
    next: { revalidate: 20 },
  });
};

export const getMessagesbyChannel = async (channel: string) => {
  return fetchData(`/messages?channel=chat-${channel}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};

// Comment-related functions
export const newComment = async (commentData: IComment) => {
  return fetchData("/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
    next: { revalidate: 20 },
  });
};

export const getCommentsbyChannel = async (channel: string) => {
  return fetchData(`/comments?channel=${channel}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};
