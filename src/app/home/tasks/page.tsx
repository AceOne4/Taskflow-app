import TasksPage from "@/components/taskComp/TasksPage";
import { IProject, TData } from "@/types/types";
import { getAllProjects, getAllTasks, getAllUsers } from "@/utils/sevice-data";
import React from "react";

export const metadata = {
  title: "Task Flow | Tasks",
};

async function page() {
  const tasks = await getAllTasks();
  const projects = await getAllProjects();
  let data: TData[] = [];
  projects.forEach((project: IProject) => {
    if (!project._id || !project.color) return;
    data.push({
      id: project._id,
      name: project.name,
      color: project.color,
    });
  });
  const users = await getAllUsers();

  return (
    <div className=" container mx-auto w-screen p-5 ">
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Tasks</h1>
      </div>
      <TasksPage tasks={tasks} ptojectData={data} users={users} />
    </div>
  );
}

export default page;
