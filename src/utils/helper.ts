import { IProject, ITask } from "@/types/types";
import { getUser } from "./sevice-data";
import bcrypt from "bcryptjs";

export async function loginChecker(email: string, password: string) {
  try {
    const user = await getUser(email);
    if (!user) return { error: "Invalid Email" };
    // logic to salt and hash password

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) return { error: "Invalid Password" };

    return user;
  } catch (error) {
    throw new Error("somthing went wrong");
  }
}

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "undone":
      return "Unassigned";
    case "todo":
      return "To Do";
    case "doing":
      return "In Progress";
    case "done":
      return "Completed";
    default:
      return status;
  }
};
export const getStatusColor = (status: string) => {
  switch (status) {
    case "undone":
      return "text-gray-500";
    case "todo":
      return "text-red-500";
    case "doing":
      return "text-yellow-500";
    case "done":
      return "text-green-500";
    default:
      return status;
  }
};

export function convertISOToCustomDate(isoString: string): Date {
  // Parse the ISO date string
  const isoDate = new Date(isoString);

  // Extract year, month (zero-based), and day
  const year = isoDate.getFullYear();
  const month = isoDate.getMonth(); // Note: getMonth() returns a zero-based month (0-11)
  const day = isoDate.getDate();

  // Create new Date object in the custom format
  return new Date(year, month, day);
}

export const generateProjectSummary = (
  projects: IProject[],
  tasks: ITask[]
): { name: string; id: string; progress: number }[] => {
  // Create initial summary from projects, filtering out projects without an id
  const summary = projects
    .filter((project) => project._id)
    .map((project) => ({
      name: project.name,
      id: project._id as string,
      progress: 0,
    }));

  // Accumulate total progress and possible progress for each project
  const progressData = tasks.reduce((acc, task) => {
    if (!acc[task.projectId]) {
      acc[task.projectId] = { completedProgress: 0, totalProgress: 0 };
    }
    acc[task.projectId].completedProgress += task.progress as number;
    acc[task.projectId].totalProgress += 100; // Assuming each task can contribute up to 100% to the project's progress

    return acc;
  }, {} as { [key: string]: { completedProgress: number; totalProgress: number } });

  // Update summary with calculated progress as percentage
  summary.forEach((project) => {
    const projectData = progressData[project.id];
    if (projectData) {
      project.progress =
        (projectData.completedProgress / projectData.totalProgress) * 100;
    }
  });

  return summary;
};

export const filtertaks = (tasks: ITask[], status: string) => {
  return tasks.filter((t) => t.status === status);
};

export function newId(str1: string, str2: string) {
  if (!str1 || !str2) return;
  // Sort the strings alphabetically
  const sortedStrings = [str1, str2].sort();

  // Merge and return the result
  return sortedStrings[0] + sortedStrings[1];
}
